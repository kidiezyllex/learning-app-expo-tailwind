import "@/global.css";
import { View } from "react-native";

// Screen Components
import HomeScreen from "@/components/Screens/HomeScreen";

export default function HomeTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <HomeScreen />
    </View>
  );
}
