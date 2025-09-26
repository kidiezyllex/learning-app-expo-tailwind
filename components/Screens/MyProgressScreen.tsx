import CourseCard from "@/components/Common/ProgressCard";
import ScreenHeader from "@/components/Common/ScreenHeader";
import SearchBar from "@/components/Common/SearchBar";
import TabSelector from "@/components/Common/TabSelector";
import { mockCourses } from "@/data/mockData";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

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

  return (
    <View  style={{ paddingTop: 102 }}
    className="flex-1">
      <ScreenHeader 
        title="My Progress"
        handleBackClick={() => onTabChange?.("statistics")}
        showRightIcons={true}
        firstRightIcon={require('../../assets/icons/bell.png')}
        firstRightIconWidth={51}
        firstRightIconHeight={51}
        secondRightIcon={require('../../assets/icons/logout.png')}
        secondRightIconWidth={39}
        secondRightIconHeight={41}
        handleFirstRightIconClick={() => {}}
        handleSecondRightIconClick={() => {}}
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
