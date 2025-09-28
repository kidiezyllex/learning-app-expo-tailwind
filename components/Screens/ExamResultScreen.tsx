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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-11 pt-6">
          {/* Exam Info Card */}
          <View className="w-full h-16 bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] p-4 mb-10">
            <View className="flex-row justify-between items-center">
              <View className="flex-row flex-1 gap-1">
                <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                  Nhà sáng lập -
                </Text>
                <Text style={{ fontSize: 24 }} className="text-black">
                  Bài kiểm tra cuối khóa
                </Text>
              </View>
              <View style={{ height: 28, paddingHorizontal: 14 }} className="flex justify-center items-center bg-green-600 rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]">
                <Text
                  style={{ fontSize: 12 }}
                  className="font-medium text-center text-black"
                >
                  Exam
                </Text>
              </View>
            </View>
          </View>

          {/* Pagination */}
          <View className="mb-10">
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
              style={{ width: 52, height: 52, minWidth: 52, minHeight: 52, flexShrink: 0, marginRight: 20 }}
              source={require('../../assets/images/sample-avatar.png')}
              className="rounded-full"
              resizeMode="cover"
            />
            <Text style={{ fontSize: 24 }} className="font-semibold text-black">
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
