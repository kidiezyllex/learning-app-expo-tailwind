import TabSelector from "@/components/Common/TabSelector";
import CourseCard from "@/components/Home/CourseCard";
import { mockCourses } from "@/components/Home/mock-data";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabOptions = [
    { id: "recommended", label: "Đề xuất", isActive: activeTab === "recommended" },
    { id: "new", label: "Mới", isActive: activeTab === "new" },
    { id: "saved", label: "Đã lưu", isActive: activeTab === "saved" },
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
    }
  };

  // Filter courses based on active tab
  const getFilteredCourses = () => {
    switch (activeTab) {
      case "new":
        return mockCourses.filter(course => course.isNew === true);
      case "saved":
        return mockCourses.filter(course => course.isSave === true);
      case "recommended":
      default:
        return mockCourses;
    }
  };


  const handleCoursePress = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const [contentHeight, setContentHeight] = useState(0);

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row justify-between items-center h-[102px] px-6 bg-[#1877F2]">
          <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 32
          }}
          className="font-medium text-white">
            Home
          </Text>
          {/* Notification and Settings */}
          <TouchableOpacity className="absolute right-6">
            <Image
              style={{ width: 50.8, height: 50.8 }}
              source={require('../../assets/icons/active-search.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
          {/* Tab Selector */}
          <View className="px-6">
            <TabSelector
              tabs={tabOptions}
              onTabPress={handleTabPress}
            />
          </View>

          {/* Blogs list */}
          <View className="px-6">
            <View className="flex-row flex-wrap justify-between">
              {getFilteredCourses().map((course) => (
                <View key={course.id} className="w-[48%] mb-6">
                  <CourseCard
                    course={course}
                    onPress={() => handleCoursePress(course.id)}
                  />
                </View>
              ))}
            </View> 
          </View>
      </ScrollView>
    </View>
  );
}
