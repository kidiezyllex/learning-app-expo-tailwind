import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Components
import EmptyState from "@/components/Common/EmptyState";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SearchBar from "@/components/Common/SearchBar";
import TabSelector from "@/components/Common/TabSelector";
import ProgressBar from "@/components/Home/ProgressBar";

interface ResultsScreenProps {
  // Header đã được move lên root level
}

// Mock results data
const mockResultsData = [
  {
    id: "1",
    examTitle: "Kiểm tra React Native",
    courseName: "React Native Cơ Bản",
    score: 85,
    maxScore: 100,
    date: "2024-01-15",
    duration: "45 phút",
    questionsCorrect: 17,
    totalQuestions: 20,
    status: "passed"
  },
  {
    id: "2",
    examTitle: "Bài tập JavaScript",
    courseName: "JavaScript ES6+",
    score: 92,
    maxScore: 100,
    date: "2024-01-12",
    duration: "30 phút",
    questionsCorrect: 23,
    totalQuestions: 25,
    status: "passed"
  },
  {
    id: "3",
    examTitle: "Thực hành UI Design",
    courseName: "UI/UX Design",
    score: 68,
    maxScore: 100,
    date: "2024-01-10",
    duration: "60 phút",
    questionsCorrect: 13,
    totalQuestions: 20,
    status: "failed"
  }
];

export default function ResultsScreen({}: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabOptions = [
    { id: "all", label: "Tất cả", isActive: activeTab === "all" },
    { id: "passed", label: "Đạt", isActive: activeTab === "passed" },
    { id: "failed", label: "Chưa đạt", isActive: activeTab === "failed" }
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResultPress = (resultId: string) => {
    console.log("Result pressed:", resultId);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const filteredResults = mockResultsData
    .filter(result => {
      const matchesSearch = result.examTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || result.status === activeTab;
      return matchesSearch && matchesTab;
    });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const isPassd = status === "passed";
    return (
      <View className={`px-3 py-1 rounded-full ${isPassd ? 'bg-green-100' : 'bg-red-100'}`}>
        <Text className={`text-xs font-medium ${isPassd ? 'text-green-800' : 'text-red-800'}`}>
          {isPassd ? 'Đạt' : 'Chưa đạt'}
        </Text>
      </View>
    );
  };

  const renderResultCard = (result: typeof mockResultsData[0]) => (
    <TouchableOpacity
      key={result.id}
      onPress={() => handleResultPress(result.id)}
      className="p-4 mb-4 bg-white rounded-xl shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="mb-1 text-lg font-semibold text-gray-900">
            {result.examTitle}
          </Text>
          <Text className="text-sm text-gray-600">
            {result.courseName}
          </Text>
        </View>
        {getStatusBadge(result.status)}
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
            {result.score}/{result.maxScore}
          </Text>
          <Text className="text-xs text-gray-500">
            {result.questionsCorrect}/{result.totalQuestions} câu đúng
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-sm text-gray-600">
            {new Date(result.date).toLocaleDateString('vi-VN')}
          </Text>
          <Text className="text-xs text-gray-500">
            Thời gian: {result.duration}
          </Text>
        </View>
      </View>

      <View className="mb-2">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xs text-gray-500">Điểm số</Text>
          <Text className="text-xs text-gray-600">{result.score}%</Text>
        </View>
        <ProgressBar progress={result.score} />
      </View>
    </TouchableOpacity>
  );

  const calculateStats = () => {
    const totalResults = mockResultsData.length;
    const passedResults = mockResultsData.filter(r => r.status === "passed").length;
    const averageScore = mockResultsData.reduce((sum, r) => sum + r.score, 0) / totalResults;
    
    return { totalResults, passedResults, averageScore };
  };

  const stats = calculateStats();

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
          {/* Stats Cards */}
          <View className="px-6 mb-4">
            <View className="flex-row space-x-3">
              <View className="flex-1 p-4 bg-white rounded-xl">
                <Text className="text-2xl font-bold text-blue-600">{stats.totalResults}</Text>
                <Text className="text-sm text-gray-600">Tổng bài thi</Text>
              </View>
              <View className="flex-1 p-4 bg-white rounded-xl">
                <Text className="text-2xl font-bold text-green-600">{stats.passedResults}</Text>
                <Text className="text-sm text-gray-600">Đã đạt</Text>
              </View>
              <View className="flex-1 p-4 bg-white rounded-xl">
                <Text className="text-2xl font-bold text-orange-600">{stats.averageScore.toFixed(0)}</Text>
                <Text className="text-sm text-gray-600">Điểm TB</Text>
              </View>
            </View>
          </View>

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
              placeholder="Tìm kiếm kết quả bài thi..."
              onSearch={handleSearch}
            />
          </View>

          {/* Results Cards */}
          <View className="px-6 mt-3">
            {isLoading ? (
              <LoadingSpinner size="large" />
            ) : filteredResults.length > 0 ? (
              filteredResults.map(renderResultCard)
            ) : (
              <EmptyState 
                title="Không tìm thấy kết quả"
                subtitle={activeTab === "all" ? "Chưa có bài thi nào" : "Không có kết quả phù hợp"}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
