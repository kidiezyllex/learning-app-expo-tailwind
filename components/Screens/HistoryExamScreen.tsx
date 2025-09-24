import Question from '@/components/HistoryExam/Question';
import { useNavigation } from '@/contexts/NavigationContext';
import { examQuestions, Question as QuestionType } from '@/data/historyExamMockData';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryExamScreen() {
  const [questions, setQuestions] = useState<QuestionType[]>(examQuestions);
  const { setCurrentHomeScreen } = useNavigation();

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId
          ? { ...question, selectedAnswer: answerId }
          : question
      )
    );
  };

  const handleBackPress = () => {
    setCurrentHomeScreen("home");
  };

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <TouchableOpacity
            onPress={handleBackPress}
            className="absolute left-3 z-10"
          >
            <Image
              style={{ width: 69, height: 69 }}
              source={require('../../assets/icons/left-arrow.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text
              style={{ fontSize: 32 }}
              className="font-medium text-white">
              Final Exam
            </Text>
          </View>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 mt-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 py-6">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
