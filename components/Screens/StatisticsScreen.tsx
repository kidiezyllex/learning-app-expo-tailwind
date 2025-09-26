import ScreenHeader from '@/components/Common/ScreenHeader';
import TabSelector from '@/components/Common/TabSelector';
import CoursesStatistics from '@/components/Group/CoursesStatistics';
import EssayGrading from '@/components/Group/EssayGrading';
import LearningTime from '@/components/Group/LearningTime';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ExamResultScreen from './ExamResultScreen';
import QuizResultScreen from './QuizResultScreen';

interface StatisticsScreenProps {
  onTabChange?: (tabId: string) => void;
}

export default function StatisticsScreen({ onTabChange }: StatisticsScreenProps) {
  const [activeTab, setActiveTab] = useState("statistics");
  const router = useRouter();
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
    } else if (screenType === 'quiz') {
      setActiveTab('quiz-result');
    }
  };

  const handleBackFromResult = () => {
    setActiveTab('eassay-grading');
  };

  const renderContent = () => {
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
          <View className="p-6 bg-white rounded-xl shadow-sm">
            <Text style={{ fontSize: 20 }} className="font-semibold text-center text-black">
              My Progress Content
            </Text>
            <Text style={{ fontSize: 16 }} className="mt-2 text-center text-gray-600">
              This tab will show your personal progress
            </Text>
          </View>
        );
      case "user":
        return (
          <View className="p-6 bg-white rounded-xl shadow-sm">
            <Text style={{ fontSize: 20 }} className="font-semibold text-center text-black">
              User Content
            </Text>
            <Text style={{ fontSize: 16 }} className="mt-2 text-center text-gray-600">
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
  };

  const isResultScreen = activeTab === 'exam-result' || activeTab === 'quiz-result';

  return (
    <View className="flex-1 pt-[80px]">
      {!isResultScreen && (
        <>
          <ScreenHeader 
            title="Statistics"
            handleBackClick={() => onTabChange?.("statistics")}
            showRightIcons={true}
            firstRightIcon={require('../../assets/icons/bell.png')}
            firstRightIconWidth={51}
            firstRightIconHeight={51}
            secondRightIcon={require('../../assets/icons/setting.png')}
            secondRightIconWidth={43}
            secondRightIconHeight={45}
            handleFirstRightIconClick={() => {
              console.log('Bell clicked');
            }}
            handleSecondRightIconClick={() => {
              console.log('Settings clicked');
            }}
          />
          {/* Scrollable Content */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View className="px-6 pt-[80px]">
              {/* Tab Selector */}
              <TabSelector
                col={4}
                tabs={tabOptions}
                onTabPress={handleTabPress}
              />

              {/* Content based on active tab */}
              {renderContent()}
            </View>
          </ScrollView>
        </>
      )}
      
      {/* Result screens render their own content */}
      {isResultScreen && renderContent()}
    </View>
  );
}
