import { Question as QuestionType } from '@/data/historyExamMockData';
import { Text, TouchableOpacity, View } from 'react-native';

interface QuestionProps {
  question: QuestionType;
  onAnswerSelect: (questionId: string, answerId: string) => void;
}

export default function Question({ question, onAnswerSelect }: QuestionProps) {
  const handleOptionPress = (answerId: string) => {
    onAnswerSelect(question.id, answerId);
  };

  return (
    <View className="mb-8">
      {/* Question Header */}
      <View className="flex-row items-center mb-14">
        <Text className="mr-2 text-base font-semibold text-blue-600">
          Câu hỏi {question.questionNumber}:
        </Text>
        <Text className="flex-1 text-base font-medium text-black">
          {question.questionText}
        </Text>
      </View>

      {/* Answer Options */}
      <View style={{ gap: 12 }} className="flex-col">
        {question.options.map((option, index) => {
          const isSelected = question.selectedAnswer === option.id;
          
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(option.id)}
              className={`w-full rounded-lg border-2 ${
                isSelected 
                  ? 'shadow-sm bg-slate-300 border-zinc-300' 
                  : 'border-zinc-300'
              }`}
              style={{ minHeight: 64 }}
            >
              <View className="flex-row items-center p-4">
                {/* Custom Radio Button */}
                <View className={`w-9 h-9 rounded-full mr-4 ${
                  isSelected 
                    ? 'bg-blue-600' 
                    : 'border-2 border-zinc-400'
                }`}>
                  {isSelected && (
                    <View className="m-auto w-4 h-4 rounded-full bg-neutral-100" />
                  )}
                </View>
                
                {/* Option Text */}
                <Text 
                  className="flex-1 text-base font-medium text-black"
                  numberOfLines={3}
                >
                  {option.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
