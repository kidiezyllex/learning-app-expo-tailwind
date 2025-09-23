import TabSelector from '@/components/Common/TabSelector';
import CoursesStatistics from '@/components/Group/CoursesStatistics';
import LearningTime from '@/components/Group/LearningTime';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface StatisticsScreenProps {
  onTabChange?: (tabId: string) => void;
}

export default function StatisticsScreen({ onTabChange }: StatisticsScreenProps) {
  const [activeTab, setActiveTab] = useState("statistics");
  const router = useRouter();
  const tabOptions = [
    { id: "statistics", label: "Statistics", isActive: activeTab === "statistics" },
    { id: "progress", label: "My Progress", isActive: activeTab === "progress" },
    { id: "user", label: "User", isActive: activeTab === "user" }
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId === "progress") {
      onTabChange?.("my-progress");
    } else {
      setActiveTab(tabId);
    }
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
          <View className="p-6 bg-white rounded-xl shadow-sm">
            <Text style={{ fontSize: 20 }} className="font-semibold text-center text-black">
              My Progress Content
            </Text>
            <Text style={{ fontSize: 16 }} className="mt-2 text-center text-gray-600">
              This tab will show your personal progress
            </Text>
          </View>
        );
      case "user":
        return (
          <View className="p-6 bg-white rounded-xl shadow-sm">
            <Text style={{ fontSize: 20 }} className="font-semibold text-center text-black">
              User Content
            </Text>
            <Text style={{ fontSize: 16 }} className="mt-2 text-center text-gray-600">
              This tab will show user information
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <TouchableOpacity
            onPress={() => onTabChange?.("statistics")}
            className="absolute left-3"
          >
            <Image
              style={{ width: 69, height: 69 }}
              source={require('../../assets/icons/left-arrow.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 32
          }}
          className="font-medium text-white">
            Statistics
          </Text>
          <View style={{ gap: 16 }} className='absolute right-6 flex-row items-center'>
            <TouchableOpacity
            >
              <Image
                style={{ width: 51, height: 51 }}
                source={require('../../assets/icons/bell.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image
                style={{ width: 43, height: 45 }}
                source={require('../../assets/icons/setting.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6">
          {/* Tab Selector */}
          <TabSelector
            tabs={tabOptions}
            onTabPress={handleTabPress}
          />

          {/* Content based on active tab */}
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
}
