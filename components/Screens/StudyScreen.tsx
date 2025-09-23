import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Components
import EmptyState from "@/components/Common/EmptyState";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SearchBar from "@/components/Common/SearchBar";
import TabSelector from "@/components/Common/TabSelector";
import ProgressBar from "@/components/Home/ProgressBar";

interface StudyScreenProps {
  // Header đã được move lên root level
}

// Mock study data
const mockStudyData = [
  {
    id: "1",
    title: "React Native Cơ Bản",
    subject: "Lập trình",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    timeSpent: "8h 30p",
    nextLesson: "Components và Props",
    thumbnail: "https://via.placeholder.com/80x80"
  },
  {
    id: "2",
    title: "JavaScript ES6+",
    subject: "Lập trình",
    progress: 80,
    totalLessons: 20,
    completedLessons: 16,
    timeSpent: "12h 15p",
    nextLesson: "Async/Await",
    thumbnail: "https://via.placeholder.com/80x80"
  },
  {
    id: "3",
    title: "UI/UX Design",
    subject: "Thiết kế",
    progress: 35,
    totalLessons: 18,
    completedLessons: 6,
    timeSpent: "4h 20p",
    nextLesson: "Color Theory",
    thumbnail: "https://via.placeholder.com/80x80"
  }
];

export default function StudyScreen({}: StudyScreenProps) {
  const [activeTab, setActiveTab] = useState("learning");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const tabOptions = [
    { id: "learning", label: "Đang học", isActive: activeTab === "learning" },
    { id: "completed", label: "Hoàn thành", isActive: activeTab === "completed" },
    { id: "saved", label: "Đã lưu", isActive: activeTab === "saved" }
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCoursePress = (courseId: string) => {
  };

  const handleExamPress = () => {
    router.push('/exam/1' as any);
  };

  const handleStatisticsPress = () => {
    router.push('/statistics/1' as any);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const filteredCourses = mockStudyData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudyCard = (course: typeof mockStudyData[0]) => (
    <TouchableOpacity
      key={course.id}
      onPress={() => handleCoursePress(course.id)}
      className="p-4 mb-4 bg-white rounded-xl shadow-sm"
    >
      <View className="flex-row">
        <View className="mr-4 w-20 h-20 bg-gray-200 rounded-xl">
          <Image
            source={{ uri: course.thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        </View>
        
        <View className="flex-1">
          <Text className="mb-1 text-lg font-semibold text-gray-900">
            {course.title}
          </Text>
          <Text className="mb-2 text-sm text-gray-600">
            {course.subject}
          </Text>
          
          <View className="mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-xs text-gray-500">
                {course.completedLessons}/{course.totalLessons} bài học
              </Text>
              <Text className="text-xs font-medium text-blue-600">
                {course.progress}%
              </Text>
            </View>
            <ProgressBar progress={course.progress} />
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-gray-500">
              Thời gian: {course.timeSpent}
            </Text>
            <Text className="text-xs text-blue-600">
              Tiếp: {course.nextLesson}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
              placeholder="Tìm kiếm khóa học đang học..."
              onSearch={handleSearch}
            />
          </View>

          {/* Test Buttons */}
          <View className="px-6 mt-3 mb-4 space-y-3">
            <TouchableOpacity
              onPress={handleExamPress}
              className="p-4 bg-blue-600 rounded-xl"
            >
              <Text style={{ fontSize: 18 }} className="font-semibold text-center text-white">
                Test Final Exam
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleStatisticsPress}
              className="p-4 bg-green-600 rounded-xl"
            >
              <Text style={{ fontSize: 18 }} className="font-semibold text-center text-white">
                Test Statistics Screen
              </Text>
            </TouchableOpacity>
          </View>

          {/* Study Cards */}
          <View className="px-6 mt-3">
            {isLoading ? (
              <LoadingSpinner size="large" />
            ) : activeTab === "learning" ? (
              filteredCourses.length > 0 ? (
                filteredCourses.map(renderStudyCard)
              ) : (
                <EmptyState 
                  title="Chưa có khóa học nào"
                  subtitle="Bắt đầu học để xem tiến độ ở đây"
                />
              )
            ) : activeTab === "completed" ? (
              <EmptyState 
                title="Chưa hoàn thành khóa học nào"
                subtitle="Hoàn thành các khóa học để xem ở đây"
              />
            ) : (
              <EmptyState 
                title="Chưa lưu khóa học nào"
                subtitle="Lưu các khóa học yêu thích để xem ở đây"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
