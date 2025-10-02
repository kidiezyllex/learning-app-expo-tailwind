import ScreenHeader from '@/components/Common/ScreenHeader';
import Question from '@/components/HistoryExam/Question';
import { useAppNavigation } from '@/contexts/NavigationContext';
import { examQuestions, Question as QuestionType } from '@/data/historyExamMockData';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function HistoryExamScreen() {
  const [questions, setQuestions] = useState<QuestionType[]>(examQuestions);
  const { setCurrentHomeScreen } = useAppNavigation();

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

  const renderQuestion = useCallback(({ item }: { item: QuestionType }) => (
    <Question
      question={item}
      onAnswerSelect={handleAnswerSelect}
    />
  ), [handleAnswerSelect]);

  return (
    <View  style={{ paddingTop: 25 }}
    className="flex-1">
      <ScreenHeader 
        title="Final Exam"
        handleBackClick={handleBackPress}
      />
      {/* Scrollable Content */}
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
        className="flex-1 mt-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24, paddingVertical: 24 }}
      />
    </View>
  );
}
