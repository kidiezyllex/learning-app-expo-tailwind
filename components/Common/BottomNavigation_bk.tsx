import * as Haptics from 'expo-haptics';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';

export const navigationTabs = [
  {
    id: "home",
    label: "Home",
    icon: require('../../assets/icons/home.png'),
    route: "/(tabs)/",
    size: 59
  },
  {
    id: "group",
    label: "Group",
    icon: require('../../assets/icons/archive-book.png'),
    route: "/(tabs)/group",
    size: 58
  },
  {
    id: "study",
    label: "Study",
    icon: require('../../assets/icons/book-saved.png'),
    route: "/(tabs)/study",
    size: 65
  },
  {
    id: "results",
    label: "Result",
    icon: require('../../assets/icons/chart.png'),
    route: "/(tabs)/results",
    size: 54
  },
  {
    id: "profile",
    label: "Profile",
    icon: require('../../assets/icons/user.png'),
    route: "/(tabs)/profile",
    size: 49
  }
];

export default function BottomNavigation() {
  const [pressedTab, setPressedTab] = useState<string | null>(null);
  const pathname = usePathname();
  const navigationRouter = useRouter();
  const floatAnimation = useRef(new Animated.Value(0)).current;

  const getActiveTab = () => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    
    if (normalizedPath === "/(tabs)" || normalizedPath === "/(tabs)/" || normalizedPath === "/" || normalizedPath === "/home") return "home";
    if (normalizedPath === "/(tabs)/group" || normalizedPath === "/group") return "group";
    if (normalizedPath === "/(tabs)/study" || normalizedPath === "/study") return "study";
    if (normalizedPath === "/(tabs)/results" || normalizedPath === "/results") return "results";
    if (normalizedPath === "/(tabs)/profile" || normalizedPath === "/profile") return "profile";
    
    // Check for nested routes
    if (normalizedPath.startsWith("/course/") || normalizedPath.startsWith("/chapter/")) return "study";
    if (normalizedPath.startsWith("/exam/") || normalizedPath.startsWith("/statistics/")) return "results";
    
    return "home";
  };

  const activeTab = getActiveTab();
  const shouldHideNavigation = pathname.startsWith("/video/");
  useEffect(() => {
    const startFloating = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnimation, {
            toValue: -8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startFloating();
  }, [floatAnimation]);

  const handleTabPress = (tab: typeof navigationTabs[0]) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    console.log("Navigating to:", tab.route); // Debug log
    
    try {
      // Use push instead of navigate for more reliable navigation
      navigationRouter.push(tab.route as any);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to replace
      navigationRouter.replace(tab.route as any);
    }
  };

  // Don't render navigation on video screens
  if (shouldHideNavigation) {
    return null;
  }

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999, // Đảm bảo nằm trên cùng
    }}>
      {/* Main Navigation Bar */}
      <View className="bg-white shadow-sm">
        <View className="flex-row h-[124px]">
          {navigationTabs.map((tab, index) => (
            <Pressable
              key={tab.id}
              onPress={() => handleTabPress(tab)}
              onPressIn={() => setPressedTab(tab.id)}
              onPressOut={() => setPressedTab(null)}
              className={`flex-1 transform transition-transform ${pressedTab === tab.id ? 'scale-95' : 'scale-100'
                }`}
            >
              {/* Tab Container */}
              <View className={`flex items-center justify-center gap-0.5 ${activeTab === tab.id
                  ? 'h-[142px] bg-blue-600 rounded-[21px] rounded-b-none transform translate-y-[-14px] shadow-sm'
                  : 'h-[124px]'
                }`}>
                <Image
                  source={tab.icon}
                  className='scale-90'
                  style={{
                    width: tab.size,
                    height: tab.size,
                  }}
                  tintColor={activeTab === tab.id ? '#ffffff' : '#646464'}
                  resizeMode="contain"
                />

                {/* Tab Label */}
                <Text 
                style={{ fontSize: 20 }}
                className={`font-medium ${activeTab === tab.id ? 'text-white' : 'text-[#646464]'
                  }`}>
                  {tab.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Floating Action Button */}
      <Animated.View
        style={{
          position: 'absolute',
          right: 24,
          bottom: 148,
          transform: [{ translateY: floatAnimation }]
        }}
      >
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/messenger-button.png')}
            style={{
              width: 88,
              height: 88,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
