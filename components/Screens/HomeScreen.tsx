import TabSelector from "@/components/Common/TabSelector";
import CourseCard from "@/components/HomeTab/CourseCard";
import { mockCourses } from "@/components/HomeTab/mock-data";
import { useCourse } from "@/contexts/CourseContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import ScreenHeader from "../Common/ScreenHeader";

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
    <View 
    style={{ paddingTop: 102 }}
    className="flex-1">
      <ScreenHeader
        title="Home"
        showRightIcons={true}
        firstRightIcon={require('../../assets/icons/active-search.png')}
        firstRightIconWidth={50.81}
        firstRightIconHeight={50.81}
        handleFirstRightIconClick={() => {}}
      />
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
