import MyProgressScreen from "@/components/Screens/MyProgressScreen";
import "@/global.css";
import { View } from "react-native";
export default function MyProgressTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <MyProgressScreen />
    </View>
  );
}
