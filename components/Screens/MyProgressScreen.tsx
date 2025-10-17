import CourseCard from "@/components/Common/ProgressCard";
import ScreenHeader from "@/components/Common/ScreenHeader";
import SearchBar from "@/components/Common/SearchBar";
import TabSelector from "@/components/Common/TabSelector";
import { mockCourses } from "@/data/mockData";
import { getScaleFactor } from "@/utils/scaling";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { icons } from "../../assets/icons/icons";

interface MyProgressScreenProps {
  onTabChange?: (tabId: string) => void;
}

export default function MyProgressScreen({ onTabChange }: MyProgressScreenProps) {

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

  const renderCourseItem = useCallback(({ item }: { item: any }) => (
    <CourseCard
      course={item}
      onPress={() => handleCoursePress(item.id)}
    />
  ), []);

  const renderHeader = useCallback(() => (
    <View>
      {/* Tab Selector */}
      <View>
        <TabSelector
          tabs={tabOptions}
          onTabPress={handleTabPress}
        />
      </View>

      <View>
        <SearchBar
          placeholder="Search"
          onSearch={handleSearch}
        />
      </View>
    </View>
  ), [tabOptions, handleTabPress, handleSearch]);

  return (
    <View className="flex-1">
      <ScreenHeader 
        title="My Progress"
        handleBackClick={() => onTabChange?.("statistics")}
        showRightIcons={true}
        firstRightIcon={icons.bell}
        firstRightIconWidth={getScaleFactor() * 51}
        firstRightIconHeight={getScaleFactor() * 51}
        secondRightIcon={icons.logout}
        secondRightIconWidth={getScaleFactor() * 39}
        secondRightIconHeight={getScaleFactor() * 41}
        handleFirstRightIconClick={() => {}}
        handleSecondRightIconClick={() => {}}
      />
      {/* Scrollable Content */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getScaleFactor() * 180, paddingHorizontal: 16, gap: getScaleFactor() * 20 }}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
