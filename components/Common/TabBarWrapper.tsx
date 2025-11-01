import { getScaleFactor } from '@/utils/scaling';
import { usePathname, useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../assets/icons/icons';
import { useAppNavigation } from '../../contexts/NavigationContext';
import CustomTabTrigger from './CustomTabTrigger';

const navigationTabs = [
  {
    id: "home",
    label: "Home",
    icon: icons.home,
    route: "/(tabs)/",
    size: getScaleFactor() * 59
  },
  {
    id: "group",
    label: "Group",
    icon: icons.archiveBook,
    route: "/(tabs)/group",
    size: getScaleFactor() * 58
  },
  {
    id: "study",
    label: "Study",
    icon: icons.bookSaved,
    route: "/(tabs)/study",
    size: getScaleFactor() * 65
  },
  {
    id: "results",
    label: "Result",
    icon: icons.chart,
    route: "/(tabs)/results",
    size: getScaleFactor() * 54
  },
  {
    id: "profile",
    label: "Profile",
    icon: icons.user,
    route: "/(tabs)/profile",
    size: getScaleFactor() * 49
  }
];

export default function TabBarWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentHomeScreen, currentResultScreen, setCurrentHomeScreen } = useAppNavigation();
  const insets = useSafeAreaInsets();

  if (currentHomeScreen === "video" || currentHomeScreen === "history-exam" || 
      currentResultScreen === "exam-result" || currentResultScreen === "quiz-result") {
    return null;
  }

  const getActiveTab = () => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    
    if (normalizedPath === "/(tabs)" || normalizedPath === "/(tabs)/" || normalizedPath === "/" || normalizedPath === "/home") return "home";
    if (normalizedPath === "/(tabs)/group" || normalizedPath === "/group") return "group";
    if (normalizedPath === "/(tabs)/study" || normalizedPath === "/study") return "study";
    if (normalizedPath === "/(tabs)/results" || normalizedPath === "/results") return "results";
    if (normalizedPath === "/(tabs)/profile" || normalizedPath === "/profile") return "profile";
    
    if (normalizedPath.startsWith("/course/") || normalizedPath.startsWith("/chapter/")) return "study";
    if (normalizedPath.startsWith("/exam/") || normalizedPath.startsWith("/statistics/")) return "results";
    
    return "home";
  };

  const activeTab = getActiveTab();

  const handleTabPress = (route: string, tabId: string) => {
    if (tabId === "home") {
      setCurrentHomeScreen("home");
    }
    router.push(route as any);
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      height: getScaleFactor() * 124 + insets.bottom,
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      flexDirection: 'row',
      alignItems: 'flex-end',
      width: '100%',
      margin: 0,
      padding: 0,
      paddingBottom: insets.bottom,
    }}>
      {navigationTabs.map((tab) => (
        <CustomTabTrigger
          key={tab.id}
          isActive={activeTab === tab.id}
          onPress={() => handleTabPress(tab.route, tab.id)}
          icon={tab.icon}
          label={tab.label}
          iconSize={tab.size}
        />
      ))}
    </View>
  );
}
