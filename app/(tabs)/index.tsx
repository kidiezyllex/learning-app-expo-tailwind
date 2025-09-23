import HomeScreen from "@/components/Screens/HomeScreen";
import "@/global.css";
import { View } from "react-native";
export default function HomeTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <HomeScreen />
    </View>
  );
}
