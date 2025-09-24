import ChapterDetailsScreen from "@/components/Screens/ChapterDetailsScreen";
import CourseDetailsScreen from "@/components/Screens/CourseDetailsScreen";
import HistoryExamScreen from "@/components/Screens/HistoryExamScreen";
import HomeScreen from "@/components/Screens/HomeScreen";
import VideoScreen from "@/components/Screens/VideoScreen";
import { useNavigation } from "@/contexts/NavigationContext";
import "@/global.css";
import { View } from "react-native";

export default function HomeTab() {
  const { currentHomeScreen } = useNavigation();
  const renderContent = () => {
    switch (currentHomeScreen) {
      case "home":
        return <HomeScreen />;
      case "course-details":
        return <CourseDetailsScreen />;
      case "chapter-details":
        return <ChapterDetailsScreen />;
      case "video":
        return <VideoScreen />;
      case "history-exam":
        return <HistoryExamScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View className="flex-1 bg-neutral-100">
      {renderContent()}
    </View>
  );
}
