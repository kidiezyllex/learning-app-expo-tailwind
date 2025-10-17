import ScreenHeader from '@/components/Common/ScreenHeader';
import TabSelector from '@/components/Common/TabSelector';
import EssayGrading from '@/components/GroupTab/EssayGrading';
import CoursesStatistics from '@/components/GroupTab/Statistics/CoursesStatistics';
import { useAppNavigation } from '@/contexts/NavigationContext';
import { getScaleFactor } from '@/utils/scaling';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
import LearningTime from '../GroupTab/Statistics/LearningTime';
import ExamResultScreen from './ExamResultScreen';
import QuizResultScreen from './QuizResultScreen';

interface StatisticsScreenProps {
  onTabChange?: (tabId: string) => void;
}

export default function StatisticsScreen({ onTabChange }: StatisticsScreenProps) {
  const [activeTab, setActiveTab] = useState("statistics");
  const router = useRouter();
  const { setCurrentResultScreen } = useAppNavigation();
  const tabOptions = [
    { id: "statistics", label: "Statistics", isActive: activeTab === "statistics" },
    { id: "progress", label: "My Progress", isActive: activeTab === "progress" },
    { id: "user", label: "User", isActive: activeTab === "user" },
    { id: "eassay-grading", label: "Essay Grading", isActive: activeTab === "eassay-grading" }
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId === "progress") {
      onTabChange?.("my-progress");
    } else {
      setActiveTab(tabId);
    }
  };

  const handleNavigateToResult = (screenType: 'exam' | 'quiz') => {
    if (screenType === 'exam') {
      setActiveTab('exam-result');
      setCurrentResultScreen('exam-result');
    } else if (screenType === 'quiz') {
      setActiveTab('quiz-result');
      setCurrentResultScreen('quiz-result');
    }
  };

  const handleBackFromResult = () => {
    setActiveTab('eassay-grading');
    setCurrentResultScreen(null);
  };

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "statistics":
        return (
          <View>
            <LearningTime />
            <CoursesStatistics />
          </View>
        );
      case "progress":
        return (
          <View 
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
            className="p-4 bg-white rounded-xl">
            <Text className="text-sm font-semibold text-center text-black">
              My Progress Content
            </Text>
            <Text className="mt-2 text-xs text-center text-gray-600">
              This tab will show your personal progress
            </Text>
          </View>
        );
      case "user":
        return (
          <View 
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
            className="p-4 bg-white rounded-xl">
            <Text className="text-sm font-semibold text-center text-black">
              User Content
            </Text>
            <Text className="mt-2 text-xs text-center text-gray-600">
              This tab will show user information
            </Text>
          </View>
        );
      case "eassay-grading":
        return (
          <View>
            <EssayGrading onNavigateToResult={handleNavigateToResult} />
          </View>
        );
      case "exam-result":
        return (
          <ExamResultScreen onBack={handleBackFromResult} />
        );
      case "quiz-result":
        return (
          <QuizResultScreen onBack={handleBackFromResult} />
        );
      default:
        return null;
    }
  }, [activeTab, handleNavigateToResult, handleBackFromResult]);

  const isResultScreen = activeTab === 'exam-result' || activeTab === 'quiz-result';

  const renderHeader = useCallback(() => (
    <View>
      <TabSelector
        col={4}
        tabs={tabOptions}
        onTabPress={handleTabPress}
      />
    </View>
  ), [tabOptions, handleTabPress]);

  return (
    <View className="flex-1">
      {!isResultScreen && (
        <>
          <ScreenHeader 
            title="Statistics"
            handleBackClick={() => onTabChange?.("statistics")}
            showRightIcons={true}
            firstRightIcon={icons.bell}
            firstRightIconWidth={getScaleFactor() * 51}
            firstRightIconHeight={getScaleFactor() * 51}
            secondRightIcon={icons.setting}
            secondRightIconWidth={getScaleFactor() * 43}
            secondRightIconHeight={getScaleFactor() * 45}
            handleFirstRightIconClick={() => {}}
            handleSecondRightIconClick={() => {}}
          />
          {/* Scrollable Content */}
          <FlatList
            data={[1]} // Single item to render the content
            renderItem={() => renderContent()}
            keyExtractor={() => 'content'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
            ListHeaderComponent={renderHeader}
            scrollEnabled={activeTab !== "eassay-grading"} // Disable scroll when essay grading tab is active to avoid conflicts
          />
        </>
      )}
      {isResultScreen && renderContent()}
    </View>
  );
}
