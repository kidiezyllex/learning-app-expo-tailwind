import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { quizResultMockData } from '../../data/quizResultMockData';
import Button from '../Common/Button';
import ScreenHeader from '../Common/ScreenHeader';
import MultipleChoicePagination from '../GroupTab/EssayGrading/MultipleChoicePagination';
import MultipleChoiceQuestion from '../GroupTab/EssayGrading/MultipleChoiceQuestion';

interface QuizResultScreenProps {
  onBack?: () => void;
}

export default function QuizResultScreen({ onBack }: QuizResultScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const data = quizResultMockData;
  
  // Ensure currentQuestionIndex is within bounds
  const safeCurrentIndex = Math.max(0, Math.min(currentQuestionIndex, data.questions.length - 1));

  const dynamicPaginationItems = data.paginationItems.map((item, index) => ({
    ...item,
    isCurrent: index === safeCurrentIndex
  }));

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };



  return (
    <View className="flex-1">
      {/* Header */}
      <ScreenHeader title="Result" onBack={onBack} />
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ paddingHorizontal: getScaleFactor() * 44, paddingTop: getScaleFactor() * 24 }}>
          {/* Quiz Info Card */}
          <View 
            style={{ 
              marginBottom: getScaleFactor() * 28,
              elevation: 5,
            }} 
            className="w-full bg-white rounded-2xl shadow-sm">
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 24 }}
              className="flex-row justify-between items-center">
              <View className="flex-row flex-1 gap-1">
                <Text className="text-base font-semibold text-black">
                  Game Object -
                </Text>
                <Text className="text-base text-black">
                  Bài kiểm tra cuối khóa
                </Text>
              </View>

              <View 
                style={{ 
                  height: getScaleFactor() * 28, 
                  paddingHorizontal: getScaleFactor() * 14,
                }} 
                className="flex shadow-sm justify-center items-center bg-orange-400 rounded-[3px]">
                <Text
                  className="text-xs font-medium text-center text-black"
                >
                  Quiz
                </Text>
              </View>
            </View>
            <View className="w-full h-0 border border-stone-300" />
            {/* Student Info */}
            <View
              style={{ padding: 16 }}
              className="flex-row items-center">
              <TouchableOpacity
              >
                <Image
                  style={{ width: getScaleFactor() * 52, height: getScaleFactor() * 52, minWidth: getScaleFactor() * 52, minHeight: getScaleFactor() * 52, flexShrink: 0, marginRight: getScaleFactor() * 20 }}
                  source={require('../../assets/images/sample-avatar.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="text-base font-semibold text-black">
                {data.studentName || 'Unknown Student'}
              </Text>
            </View>
          </View>

          {/* Pagination */}
          <MultipleChoicePagination
            items={dynamicPaginationItems}
            onItemSelect={handleQuestionSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
          {/* Current Question Card */}
          {data.questions[safeCurrentIndex] && (
            <MultipleChoiceQuestion question={data.questions[safeCurrentIndex]} />
          )}

          {/* Grade Button */}
          <View className="items-center mt-6">
            <Button
              style={{ width: getScaleFactor() * 310 }}
              text="Grade"
              onPress={() => { }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
