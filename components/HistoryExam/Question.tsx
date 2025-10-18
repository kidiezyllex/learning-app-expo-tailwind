import { Question as QuestionType } from '@/data/historyExamMockData';
import { getScaleFactor } from '@/utils/scaling';
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
    <View style={{ marginBottom: getScaleFactor() * 32 }}>
      {/* Question Header */}
      <View className="flex-row items-center" style={{ marginBottom: getScaleFactor() * 56 }}>
        <Text className="mr-1 text-base font-semibold text-blue-600">
          Câu hỏi {question.questionNumber}:
        </Text>
        <Text className="flex-1 text-base font-medium text-black">
          {question.questionText}
        </Text>
      </View>

      {/* Answer Options */}
      <View style={{ gap: getScaleFactor() * 12 }} className="flex-col">
        {question.options.map((option, index) => {
          const isSelected = question.selectedAnswer === option.id;
          
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(option.id)}
              style={{
                minHeight: getScaleFactor() * 64,
                shadowColor: isSelected ? '#000' : 'transparent',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: isSelected ? 0.05 : 0,
                shadowRadius: 2,
                elevation: isSelected ? 2 : 0,
              }}
              className={`w-full rounded-lg border ${
                isSelected 
                  ? 'bg-slate-300 border-zinc-300' 
                  : 'border-zinc-300'
              }`}
            >
              <View style={{ padding: getScaleFactor() * 16 }} className="flex-row items-center">
                {/* Custom Radio Button */}
                <View style={{ width: getScaleFactor() * 36, height: getScaleFactor() * 36, marginRight: getScaleFactor() * 16 }} className={`rounded-full ${
                  isSelected 
                    ? 'bg-blue-600' 
                    : 'border border-zinc-400'
                }`}>
                  {isSelected && (
                    <View style={{ width: getScaleFactor() * 16, height: getScaleFactor() * 16, margin: 'auto' }} className="rounded-full bg-neutral-100" />
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
