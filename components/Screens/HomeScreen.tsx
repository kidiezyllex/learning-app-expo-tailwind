import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

// Components
import EmptyState from "@/components/Common/EmptyState";
import Header from "@/components/Common/Header";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SearchBar from "@/components/Common/SearchBar";
import CourseCard from "@/components/Home/CourseCard";
import TabSelector from "@/components/Home/TabSelector";

// Data
import { mockCourses, mockUser } from "@/data/mockData";

interface HomeScreenProps {
  onNotificationPress: () => void;
}

export default function HomeScreen({ onNotificationPress }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabOptions = [
    { id: "trending", label: "Xu hướng", isActive: activeTab === "trending" },
    { id: "recommended", label: "Đề xuất", isActive: activeTab === "recommended" },
    { id: "recent", label: "Gần đây", isActive: activeTab === "recent" }
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCoursePress = (courseId: string) => {
    console.log("Course pressed:", courseId);
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

  // Sort courses based on active tab
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (activeTab === "trending") {
      return b.completionRate - a.completionRate; // Sort by completion rate for trending
    } else if (activeTab === "recent") {
      return b.completedTests - a.completedTests; // Sort by completed tests for recent
    }
    return 0; // Default for recommended
  });

  return (
    <View className="flex-1 bg-neutral-100">
      {/* Header */}
      <Header 
        user={mockUser}
        onNotificationPress={onNotificationPress}
      />

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

          {/* Search Bar */}
          <View className="px-6">
            <SearchBar 
              placeholder="Tìm kiếm khóa học..."
              onSearch={handleSearch}
            />
          </View>

          {/* Course Cards */}
          <View className="px-6 mt-3">
            {isLoading ? (
              <LoadingSpinner size="large" />
            ) : sortedCourses.length > 0 ? (
              sortedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPress={() => handleCoursePress(course.id)}
                />
              ))
            ) : (
              <EmptyState 
                title="Không tìm thấy khóa học"
                subtitle="Thử tìm kiếm với từ khóa khác"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
