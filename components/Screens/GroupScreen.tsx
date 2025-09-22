import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

// Components
import EmptyState from "@/components/Common/EmptyState";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SearchBar from "@/components/Common/SearchBar";
import CourseCard from "@/components/Home/CourseCard";
import TabSelector from "@/components/Home/TabSelector";

// Data
import { mockCourses } from "@/data/mockData";

interface GroupScreenProps {
  // Header đã được move lên root level
}

export default function GroupScreen({}: GroupScreenProps) {
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

  return (
    <View className="flex-1 bg-neutral-100 pt-[102px]">
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
              placeholder="Search"
              onSearch={handleSearch}
            />
          </View>

          {/* Course Cards */}
          <View className="px-6 mt-3">
            {isLoading ? (
              <LoadingSpinner size="large" />
            ) : activeTab === "courses" ? (
              filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
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
              )
            ) : (
              <EmptyState 
                title="Danh sách thành viên"
                subtitle="Chức năng đang được phát triển"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
