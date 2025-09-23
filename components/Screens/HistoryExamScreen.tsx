import Question from '@/components/HistoryExam/Question';
import { examQuestions, Question as QuestionType } from '@/data/historyExamMockData';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface HistoryExamScreenProps {
  // Props if needed
}

export default function HistoryExamScreen({}: HistoryExamScreenProps) {
  const [questions, setQuestions] = useState<QuestionType[]>(examQuestions);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === questionId 
          ? { ...question, selectedAnswer: answerId }
          : question
      )
    );
  };

  return (
    <View className="flex-1 bg-neutral-100 pt-[96px]">
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
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
