import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { examResultMockData } from '../../data/examResultMockData';
import ScreenHeader from '../Common/ScreenHeader';
import EssayPagination from '../GroupTab/EssayGrading/EssayPagination';
import EssayQuestion from '../GroupTab/EssayGrading/EssayQuestion';
interface ExamResultScreenProps {
  onBack?: () => void;
}

export default function ExamResultScreen({ onBack }: ExamResultScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const data = examResultMockData;
  
  const safeCurrentIndex = Math.max(0, Math.min(currentQuestionIndex, data.questions.length - 1));

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <ScreenHeader title="Result" onBack={onBack} />
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getScaleFactor() * 100 }}
      >
        <View style={{ paddingHorizontal: 16, paddingTop: getScaleFactor() * 24 }}>
          {/* Exam Info Card */}
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
              padding: getScaleFactor() * 16,
              marginBottom: getScaleFactor() * 40,
            }}
            className="w-full bg-white rounded-2xl">
            <View className="flex-row justify-between items-center">
              <View className="flex-row flex-1 gap-1">
                <Text className="text-base font-semibold text-black">
                  Nhà sáng lập -
                </Text>
                <Text className="text-base text-black">
                  Bài kiểm tra cuối khóa
                </Text>
              </View>
              <View 
                style={{ 
                  height: getScaleFactor() * 28, 
                  paddingHorizontal: getScaleFactor() * 14,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 3,
                }}
                className="flex justify-center items-center bg-green-600 rounded-[3px]">
                <Text
                  className="text-xs font-medium text-center text-black"
                >
                  Exam
                </Text>
              </View>
            </View>
          </View>

          {/* Pagination */}
          <View style={{ marginBottom: getScaleFactor() * 40 }}>
            <EssayPagination
              totalItems={data.questions.length}
              currentIndex={safeCurrentIndex}
              onItemSelect={handleQuestionSelect}
              maxVisibleItems={6}
            />
          </View>

          {/* Student Info */}
          <View className="flex-row items-center" style={{ marginBottom: 28 }}>
            <Image
              style={{ width: getScaleFactor() * 52, height: getScaleFactor() * 52, minWidth: getScaleFactor() * 52, minHeight: getScaleFactor() * 52, flexShrink: 0, marginRight: getScaleFactor() * 20 }}
              source={require('../../assets/images/sample-avatar.png')}
              className="rounded-full"
              resizeMode="cover"
            />
            <Text className="text-base font-semibold text-black">
              {data.studentName || 'Unknown Student'}
            </Text>
          </View>
          {/* Current Question Card */}
          {data.questions[safeCurrentIndex] && (
            <EssayQuestion question={data.questions[safeCurrentIndex]} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
