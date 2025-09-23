import "@/global.css";
import { View } from "react-native";

// Screen Components
import BottomNavigation from "@/components/Common/BottomNavigation";
import StatisticsHeader from "@/components/Group/StatisticsHeader";
import StatisticsScreen from "@/components/Screens/StatisticsScreen";

export default function StatisticsTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <StatisticsHeader />
      <StatisticsScreen />
      <BottomNavigation />
    </View>
  );
}
