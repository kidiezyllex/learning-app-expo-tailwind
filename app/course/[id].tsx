import CourseDetailsScreen from "@/components/Screens/CourseDetailsScreen";
import "@/global.css";
import { View } from "react-native";
export default function CourseDetailsTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <CourseDetailsScreen />
    </View>
  );
}
