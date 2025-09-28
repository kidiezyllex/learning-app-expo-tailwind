import { Image, Text, View } from 'react-native';
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
        style={{ paddingHorizontal: 20, paddingVertical: 24, gap: 20, marginBottom: 24 }}
        key={answer.id}
        className={`w-full ${bgColor} flex-row items-center rounded-[10px] border-2 ${borderColor} ${answer.isSelected && answer.isCorrect ? 'shadow-sm' : ''
          }`}
      >
        <View
          style={{ width: 24, height: 24, minWidth: 24, minHeight: 24, flexShrink: 0 }}
          className={`rounded-full ${answer.isSelected || answer.isCorrect ? dotColor : 'outline outline-2 outline-zinc-400'
            }`}
        />
        <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-black">
          {answer.text}
        </Text>
      </View>
    );
  };

  return (
    <View
      key={question.id}
      style={{ paddingVertical: 32, paddingHorizontal: 64, marginBottom: 24 }}
      className="w-full bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)]"
    >
      {/* Question Text */}
      <Text
        style={{ fontSize: 24, marginBottom: 24 }}
        className="font-semibold text-black"
      >
        Question: {question.questionText}
      </Text>

      {/* Answer Options */}
      <View style={{ marginBottom: 12 }}>
        {question.answers.map((answer, index) =>
          renderAnswerOption(answer, index)
        )}
      </View>

      {/* Explanation */}
      <View
        style={{ padding: 12, marginBottom: 24 }}
        className={`w-full bg-amber-100 border-2 border-amber-400 rounded-[10px]`}
      >
        <View className="flex-row items-start">
          <Image
            style={{ width: 13, height: 17, marginRight: 12 }}
            source={require('../../../assets/icons/bulb.png')}
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text style={{ fontSize: 14 }} className="text-black">
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Explanation:</Text>
              {" "}{question.explanation}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
