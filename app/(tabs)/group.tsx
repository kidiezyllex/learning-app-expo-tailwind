import StatisticsScreen from "@/components/Screens/StatisticsScreen";
import "@/global.css";
import { View } from "react-native";
export default function GroupTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <StatisticsScreen />
    </View>
  );
}
