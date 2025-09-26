import ScreenHeader from '@/components/Common/ScreenHeader';
import Question from '@/components/HistoryExam/Question';
import { useNavigation } from '@/contexts/NavigationContext';
import { examQuestions, Question as QuestionType } from '@/data/historyExamMockData';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

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
    <View className="flex-1 pt-[80px]">
      <ScreenHeader 
        title="Final Exam"
        handleBackClick={handleBackPress}
      />
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
