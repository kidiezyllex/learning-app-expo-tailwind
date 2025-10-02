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
        <View className="px-11 pt-6">
          {/* Quiz Info Card */}
          <View 
            style={{ 
              marginBottom: 28,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              elevation: 5,
            }} 
            className="w-full bg-white rounded-2xl">
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 24 }}
              className="flex-row justify-between items-center">
              <View className="flex-row flex-1 gap-1">
                <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                  Game Object -
                </Text>
                <Text style={{ fontSize: 24 }} className="text-black">
                  Bài kiểm tra cuối khóa
                </Text>
              </View>

              <View 
                style={{ 
                  height: 28, 
                  paddingHorizontal: 14,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 3,
                }} 
                className="flex justify-center items-center bg-orange-400 rounded-[3px]">
                <Text
                  style={{ fontSize: 12 }}
                  className="font-medium text-center text-black"
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
                  style={{ width: 52, height: 52, minWidth: 52, minHeight: 52, flexShrink: 0, marginRight: 20 }}
                  source={require('../../assets/images/sample-avatar.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 24 }} className="font-semibold text-black">
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
              style={{ width: 310 }}
              text="Grade"
              onPress={() => { }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
