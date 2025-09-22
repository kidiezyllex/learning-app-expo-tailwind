import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Components
import BlogCard from "@/components/Home/BlogCard";
import TabSelector from "@/components/Home/TabSelector";

import { mockBlogs } from "@/components/Home/mock-data";
import { mockCourses } from "@/data/mockData";

interface HomeScreenProps {
  // Header đã được move lên root level
}

export default function HomeScreen({ }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCoursePress = (courseId: string) => {
    console.log("Course pressed:", courseId);
  };

  const handleBlogPress = (blogId: string) => {
    console.log("Blog pressed:", blogId);
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
    if (activeTab === "saved") {
      return b.completionRate - a.completionRate; // Sort by completion rate for saved
    } else if (activeTab === "new") {
      return b.completedTests - a.completedTests; // Sort by completed tests for new
    }
    return 0; // Default for recommended
  });

  return (
    <View className="flex-1 bg-neutral-100 pt-[102px]">
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999, // Đảm bảo nằm trên cùng
      }}>
        <View className="flex relative flex-row justify-between items-center h-[102px] px-6 bg-[#1877F2]">
          <Text className="absolute left-1/2 text-3xl font-medium text-white -translate-x-1/2">
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

          {/* Blogs list */}
          <View className="px-6 mt-6">
            <View className="grid flex-row flex-wrap grid-cols-2 gap-6 justify-between">
              {mockBlogs.map((blog) => (
                <View key={blog.id} className="">
                  <BlogCard
                    blog={blog}
                    onPress={handleBlogPress}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
