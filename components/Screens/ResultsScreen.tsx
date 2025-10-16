import ScreenHeader from "@/components/Common/ScreenHeader";
import Efficiency from "@/components/ResultTab/Efficiency";
import History from "@/components/ResultTab/History";
import WeekChart from "@/components/ResultTab/WeekChart";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import TabSelector from "../Common/TabSelector";

export default function ResultsScreen() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabOptions = [
    { id: "overview", label: "Overview", isActive: activeTab === "overview" },
    { id: "detail", label: "Detail", isActive: activeTab === "detail" },
  ];
  const handleTabPress = (tabId: string) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
    }
  };

  return (
    <View style={{ paddingTop: 25 }}
      className="flex-1">
      <ScreenHeader
        title="Kết quả"
      />
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        <TabSelector tabs={tabOptions} onTabPress={handleTabPress} />
        <View className="px-4">
          {/* Week Chart Section */}
          <View className="mb-6">
            <Text style={{ marginBottom: 20 }} className="text-xl font-medium text-neutral-950">
              This week
            </Text>
            <WeekChart />
          </View>

          {/* History */}
          <View className="mb-6">
            <Text style={{ marginBottom: 20 }} className="text-xl font-medium text-neutral-950">
              Quiz/Exam History
            </Text>
            <History />
          </View>

          {/* Efficiency Section */}
          <View>
            <Text style={{ marginBottom: 20 }} className="text-xl font-medium text-neutral-950">
              My performance
            </Text>
            <Efficiency />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
