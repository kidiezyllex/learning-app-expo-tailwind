import { useNavigation } from "@/contexts/NavigationContext";
import "@/global.css";
import { View } from "react-native";

// Screen Components
import GroupScreen from "@/components/Screens/GroupScreen";
import HomeScreen from "@/components/Screens/HomeScreen";
import ProfileScreen from "@/components/Screens/ProfileScreen";
import ResultsScreen from "@/components/Screens/ResultsScreen";
import StudyScreen from "@/components/Screens/StudyScreen";

export default function MainScreen() {
  const { activeTab } = useNavigation();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "group":
        return <GroupScreen />;
      case "study":
        return <StudyScreen />;
      case "results":
        return <ResultsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View className="flex-1 bg-neutral-100">
      {/* Active Screen Content */}
      {renderActiveScreen()}
    </View>
  );
}
