import CourseCard from "@/components/Common/ProgressCard";
import SearchBar from "@/components/Common/SearchBar";
import TabSelector from "@/components/Common/TabSelector";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { mockCourses } from "@/data/mockData";

export default function MyProgressScreen() {

  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabOptions = [
    { id: "courses", label: "Khóa học", isActive: activeTab === "courses" },
    { id: "members", label: "Thành viên", isActive: activeTab === "members" }
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCoursePress = (courseId: string) => {
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const filteredCourses = mockCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 pt-[102px] pb-32">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-3"
          >
            <Image
              style={{ width: 69, height: 69 }}
              source={require('../../assets/icons/left-arrow.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="absolute left-1/2 text-3xl font-medium text-white -translate-x-1/2">
            Group 1
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
                style={{ width: 39, height: 41 }}
                source={require('../../assets/icons/logout.png')}
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
        contentContainerStyle={{ paddingBottom: 180 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {/* Tab Selector */}
          <View className="px-6">
            <TabSelector
              tabs={tabOptions}
              onTabPress={handleTabPress}
            />
          </View>

          <View className="px-6">
            <SearchBar
              placeholder="Search"
              onSearch={handleSearch}
            />
          </View>

          {/* Course Cards */}
          <View style={{ gap: 20, marginTop: 20 }} className="flex-col px-6">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => handleCoursePress(course.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
