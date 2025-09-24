import TabSelector from "@/components/Common/TabSelector";
import CourseCard from "@/components/Home/CourseCard";
import { mockCourses } from "@/components/Home/mock-data";
import { useCourse } from "@/contexts/CourseContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setSelectedCourse } = useCourse();
  const { setCurrentHomeScreen } = useNavigation();

  const tabOptions = [
    { id: "recommended", label: "Recommended", isActive: activeTab === "recommended" },
    { id: "new", label: "New", isActive: activeTab === "new" },
    { id: "saved", label: "Saved", isActive: activeTab === "saved" },
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
    // Find the course from mockCourses and set it as selected
    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
    setCurrentHomeScreen("course-details");
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row justify-between items-center h-[102px] px-6 bg-[#1877F2]">
          <View className="flex-1 justify-center items-center">
            <Text
              style={{ fontSize: 32 }}
              className="font-medium text-white">
              Home
            </Text>
          </View>
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

          {/* Course list */}
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
