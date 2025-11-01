import TabSelector from "@/components/Common/TabSelector";
import CourseCard from "@/components/HomeTab/CourseCard";
import { mockCourses } from "@/components/HomeTab/mock-data";
import { useCourse } from "@/contexts/CourseContext";
import { useAppNavigation } from "@/contexts/NavigationContext";
import { getScaleFactor } from "@/utils/scaling";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { icons } from "../../assets/icons/icons";
import ScreenHeader from "../Common/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setSelectedCourse } = useCourse();
  const { setCurrentHomeScreen } = useAppNavigation();

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

  const renderCourseItem = useCallback(({ item, index }: { item: any; index: number }) => (
    <View
      style={{ paddingRight: index % 2 === 0 ? getScaleFactor() * 12 : 0, paddingLeft: index % 2 === 0 ? 0 : getScaleFactor() * 12, marginBottom: getScaleFactor() * 24 }}
      className="flex-1">
      <CourseCard
        course={item}
        onPress={() => handleCoursePress(item.id)}
      />
    </View>
  ), []);

  const renderHeader = useCallback(() => (
    <View className="px-4">
      <TabSelector
        tabs={tabOptions}
        onTabPress={handleTabPress}
      />
    </View>
  ), [tabOptions, handleTabPress]);

  return (
    <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
      <ScreenHeader
        title="Home"
        showRightIcons={true}
        firstRightIcon={icons.activeSearch}
        firstRightIconWidth={getScaleFactor() * 50.81}
        firstRightIconHeight={getScaleFactor() * 50.81}
        handleFirstRightIconClick={() => { }}
      />
      <FlatList
        data={getFilteredCourses()}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getScaleFactor() * 180, paddingHorizontal: getScaleFactor() * 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
