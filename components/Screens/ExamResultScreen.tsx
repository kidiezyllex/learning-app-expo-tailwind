import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { examResultMockData } from '../../data/examResultMockData';
import ScreenHeader from '../Common/ScreenHeader';
import EssayQuestion from '../Group/EssayQuestion';

interface ExamResultScreenProps {
  onBack?: () => void;
}

export default function ExamResultScreen({ onBack }: ExamResultScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const data = examResultMockData;

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const renderQuestionNumber = (number: number, index: number) => {
    const isActive = index === currentQuestionIndex;
    return (
      <TouchableOpacity
        style={{ height: 40, width: 40, minHeight: 40, minWidth: 40, flexShrink: 0 }}
        key={number}
        onPress={() => handleQuestionSelect(index)}
        className={`rounded-full flex justify-center items-center border-[2px] bg-[#E5E5E5] ${isActive ? 'border-[#626262]' : 'border-transparent'
          }`}
      >
        <Text
          style={{ fontSize: 16 }}
          className="font-medium text-center text-[#626262]"
        >
          {number}
        </Text>
      </TouchableOpacity>
    );
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
          <View className="flex-row justify-center items-center mb-10" style={{ gap: 20 }}>
            <TouchableOpacity
            >
              <Image
                style={{ width: 20, height: 34 }}
                source={require('../../assets/icons/left-angle.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {data.questionNumbers.map((number: number, index: number) =>
              renderQuestionNumber(number, index)
            )}
            <TouchableOpacity
            >
              <Image
                style={{ width: 20, height: 34 }}
                source={require('../../assets/icons/right-angle.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
              {data.studentName}
            </Text>
          </View>
          {/* Current Question Card */}
          <EssayQuestion question={data.questions[currentQuestionIndex]} />
        </View>
      </ScrollView>
    </View>
  );
}
