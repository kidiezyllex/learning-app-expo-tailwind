import { usePathname, useRouter } from 'expo-router';
import { View } from 'react-native';
import { useNavigation } from '../../contexts/NavigationContext';
import CustomTabTrigger from './CustomTabTrigger';

const navigationTabs = [
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

export default function TabBarWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentHomeScreen } = useNavigation();

  // Hide tab bar when in video screen
  if (currentHomeScreen === "video") {
    return null;
  }

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

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      height: 140,
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      flexDirection: 'row',
      alignItems: 'flex-end',
      width: '100%',
      margin: 0,
      padding: 0,
    }}>
      {navigationTabs.map((tab) => (
        <CustomTabTrigger
          key={tab.id}
          isActive={activeTab === tab.id}
          onPress={() => handleTabPress(tab.route)}
          icon={tab.icon}
          label={tab.label}
          iconSize={tab.size}
        />
      ))}
    </View>
  );
}
