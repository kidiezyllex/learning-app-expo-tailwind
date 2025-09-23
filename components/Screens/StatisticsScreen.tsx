import TabSelector from '@/components/Common/TabSelector';
import CoursesStatistics from '@/components/Group/CoursesStatistics';
import LearningTime from '@/components/Group/LearningTime';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface StatisticsScreenProps {
  // Props if needed
}

export default function StatisticsScreen({}: StatisticsScreenProps) {
  const [activeTab, setActiveTab] = useState("statistics");

  const tabOptions = [
    { id: "statistics", label: "Statistics", isActive: activeTab === "statistics" },
    { id: "progress", label: "My Progress", isActive: activeTab === "progress" },
    { id: "user", label: "User", isActive: activeTab === "user" }
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "statistics":
        return (
          <View>
            <LearningTime />
            <CoursesStatistics />
          </View>
        );
      case "progress":
        return (
          <View className="bg-white rounded-xl shadow-sm p-6">
            <Text style={{ fontSize: 20 }} className="font-semibold text-black text-center">
              My Progress Content
            </Text>
            <Text style={{ fontSize: 16 }} className="text-gray-600 text-center mt-2">
              This tab will show your personal progress
            </Text>
          </View>
        );
      case "user":
        return (
          <View className="bg-white rounded-xl shadow-sm p-6">
            <Text style={{ fontSize: 20 }} className="font-semibold text-black text-center">
              User Content
            </Text>
            <Text style={{ fontSize: 16 }} className="text-gray-600 text-center mt-2">
              This tab will show user information
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-neutral-100 pt-[96px]">
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 py-6">
          {/* Tab Selector */}
          <View className="mb-6">
            <TabSelector 
              tabs={tabOptions}
              onTabPress={handleTabPress}
            />
          </View>

          {/* Content based on active tab */}
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
}
