import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, View } from 'react-native';
import { icons } from '../../../assets/icons/icons';
import { QuestionResult } from '../../../data/examResultMockData';

interface EssayQuestionProps {
  question: QuestionResult;
}

export default function EssayQuestion({ question }: EssayQuestionProps) {
  return (
    <View
      key={question.id}
      style={{
        paddingVertical: 32,
        paddingHorizontal: 64,
        marginBottom: 24,
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
        Question {question.questionNumber || 'N/A'}: {question.questionText || 'No question text'}
      </Text>

      <View
        style={{ paddingVertical: 10, paddingHorizontal: 28, minHeight: 106, marginBottom: 24 }}
        className={`w-full border rounded-[5px] bg-neutral-100 border-zinc-300`}
      >
        <Text className="text-xs font-medium text-black">Student Answer Placeholder</Text>
      </View>

      {/* Chấm điểm */}
      <View style={{ gap: 16, marginBottom: 24 }} className='flex-row items-center'>
        <Text className='text-xs italic font-semibold text-black'>Chấm điểm:</Text>
        <View style={{ height: 36, minHeight: 36, paddingHorizontal: 32 }} className='flex-row items-center justify-center border-[2px] border-[#FF0000] rounded-[5px]'>
          <Text className='font-medium text-[#FF0000] text-xs'>{question.score || 'N/A'}/{question.maxScore || 'N/A'}</Text>
        </View>
      </View>
      {/* Answer Template */}
      <View
        style={{ padding: 12, marginBottom: 24 }}
        className={`w-full bg-amber-100 border border-amber-400 rounded-[5px]`}
      >
        <View className="flex-row items-start">
          <Image
            style={{ width: 13, height: 17, marginRight: 12 }}
            source={icons.bulb}
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-xs text-black">
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Answer Template:</Text>
              {" "}{question.answerTemplate || 'No answer template provided'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{ padding: 12 }}
        className="w-full bg-green-100 rounded-[5px] border border-lime-400">
        <View className="flex-row items-start">
          <Image
            style={{ width: 15, height: 13, marginRight: 12 }}
            source={icons.feedback}
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-xs text-black">
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Feedback:</Text>
              {" "}{question.feedback || 'No feedback provided'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
