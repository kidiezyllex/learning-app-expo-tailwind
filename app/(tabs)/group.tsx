import MyProgressScreen from "@/components/Screens/MyProgressScreen";
import StatisticsScreen from "@/components/Screens/StatisticsScreen";
import "@/global.css";
import { useState } from "react";
import { View } from "react-native";

export default function GroupTab() {
  const [activeTab, setActiveTab] = useState("statistics");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "statistics":
        return <StatisticsScreen onTabChange={handleTabChange} />;
      case "my-progress":
        return <MyProgressScreen onTabChange={handleTabChange} />;
      default:
        return <StatisticsScreen onTabChange={handleTabChange} />;
    }
  };

  return (
    <View className="flex-1 bg-neutral-100">
      {renderContent()}
    </View>
  );
}
