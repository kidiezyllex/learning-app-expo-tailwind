import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface AbsoluteBottomNavigationProps {
  onTabPress?: (tabId: string) => void;
  activeTab?: string;
}

export const navigationTabs = [
  {
    id: "home",
    label: "Trang chủ",
    icon: require('../../assets/icons/home.png'),
    isActive: true,
    size: 59
  },
  {
    id: "group",
    label: "Nhóm",
    icon: require('../../assets/icons/archive-book.png'),
    isActive: false,
    size: 58
  },
  {
    id: "study",
    label: "Học",
    icon: require('../../assets/icons/book-saved.png'),
    isActive: false,
    size: 65
  },
  {
    id: "results",
    label: "Kết quả",
    icon: require('../../assets/icons/chart.png'),
    isActive: false,
    size: 54
  },
  {
    id: "profile",
    label: "Bạn",
    icon: require('../../assets/icons/user.png'),
    isActive: false,
    size: 49
  }
];

export default function AbsoluteBottomNavigation({ onTabPress, activeTab: propActiveTab }: AbsoluteBottomNavigationProps) {
  const [pressedTab, setPressedTab] = useState<string | null>(null);
  const activeTab = propActiveTab || "home";
  const floatAnimation = useRef(new Animated.Value(0)).current;

  // Floating animation effect
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

  const handleTabPress = (tabId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onTabPress?.(tabId);
  };

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
              onPress={() => handleTabPress(tab.id)}
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
                <Text className={`text-[13px] font-medium ${activeTab === tab.id ? 'text-white' : 'text-[#646464]'
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
