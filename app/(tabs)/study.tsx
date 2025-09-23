import StudyScreen from "@/components/Screens/StudyScreen";
import "@/global.css";
import { View } from "react-native";
export default function StudyTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <StudyScreen />
    </View>
  );
}
