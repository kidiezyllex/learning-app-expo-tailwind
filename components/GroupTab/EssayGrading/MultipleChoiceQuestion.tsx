import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, View } from 'react-native';
import { icons } from '../../../assets/icons/icons';
import { QuizQuestion } from '../../../data/quizResultMockData';

interface MultipleChoiceQuestionProps {
  question: QuizQuestion;
}

export default function MultipleChoiceQuestion({ question }: MultipleChoiceQuestionProps) {
  const renderAnswerOption = (answer: any, index: number) => {
    let bgColor = 'bg-white';
    let borderColor = 'border-zinc-300';
    let dotColor = 'outline-zinc-400';

    if (answer.isSelected && answer.isCorrect) {
      bgColor = 'bg-green-200';
      borderColor = 'border-green-600';
      dotColor = 'bg-green-600';
    } else if (answer.isSelected && !answer.isCorrect) {
      bgColor = 'bg-rose-200';
      borderColor = 'border-red-600';
      dotColor = 'bg-red-600';
    } else if (!answer.isSelected && answer.isCorrect) {
      bgColor = 'bg-green-100';
      borderColor = 'border-green-400';
      dotColor = 'bg-green-500';
    }

    return (
      <View
        style={{ 
          paddingHorizontal: getScaleFactor() * 20, 
          paddingVertical: getScaleFactor() * 24, 
          gap: getScaleFactor() * 20, 
          marginBottom: getScaleFactor() * 24,
        }}
        key={answer.id}
        className={`flex-row items-center w-full border ${bgColor} rounded-[5px] ${borderColor}`}
      >
          <View
            style={{ width: getScaleFactor() * 24, height: getScaleFactor() * 24, minWidth: getScaleFactor() * 24, minHeight: getScaleFactor() * 24, flexShrink: 0 }}
          className={`rounded-full ${answer.isSelected || answer.isCorrect ? dotColor : 'outline outline-2 outline-zinc-400'
            }`}
        />
        <Text className="flex-1 text-sm font-medium text-black">
          {answer.text}
        </Text>
      </View>
    );
  };

  return (
    <View
      key={question.id}
      style={{ 
        paddingVertical: getScaleFactor() * 32, 
        paddingHorizontal: getScaleFactor() * 64, 
        marginBottom: getScaleFactor() * 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
      className="w-full bg-white rounded-2xl"
    >
      {/* Question Text */}
      <Text
        style={{ marginBottom: getScaleFactor() * 24 }}
        className="text-base font-semibold text-black"
      >
        Question: {question.questionText}
      </Text>

      {/* Answer Options */}
      <View style={{ marginBottom: getScaleFactor() * 12 }}>
        {question.answers.map((answer, index) =>
          renderAnswerOption(answer, index)
        )}
      </View>

      {/* Explanation */}
      <View
        style={{ padding: getScaleFactor() * 12, marginBottom: getScaleFactor() * 24 }}
        className={`w-full bg-amber-100 border border-amber-400 rounded-[5px]`}
      >
        <View className="flex-row items-start">
          <Image
            style={{ width: getScaleFactor() * 13, height: getScaleFactor() * 17, marginRight: getScaleFactor() * 12 }}
            source={icons.bulb}
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-sm text-black">
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Explanation:</Text>
              {" "}{question.explanation}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
