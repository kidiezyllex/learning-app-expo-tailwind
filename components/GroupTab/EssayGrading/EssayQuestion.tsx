import { Image, Text, View } from 'react-native';
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
      }}
      className="w-full bg-white rounded-2xl"
    >
      {/* Question Text */}
      <Text
        style={{ fontSize: 24, marginBottom: 24 }}
        className="font-semibold text-black"
      >
        Question {question.questionNumber || 'N/A'}: {question.questionText || 'No question text'}
      </Text>

      <View
        style={{ paddingVertical: 10, paddingHorizontal: 28, minHeight: 106, marginBottom: 24 }}
        className={`w-full border-2 rounded-[10px] bg-neutral-100 border-zinc-300`}
      >
        <Text style={{ fontSize: 16 }} className="font-medium text-black">Student Answer Placeholder</Text>
      </View>

      {/* Chấm điểm */}
      <View style={{ gap: 16, marginBottom: 24 }} className='flex-row items-center'>
        <Text style={{ fontSize: 16 }} className='italic font-semibold text-black'>Chấm điểm:</Text>
        <View style={{ height: 36, minHeight: 36, paddingHorizontal: 32 }} className='flex-row items-center justify-center border-[2px] border-[#FF0000] rounded-[10px]'>
          <Text style={{ fontSize: 16 }} className='font-medium text-[#FF0000]'>{question.score || 'N/A'}/{question.maxScore || 'N/A'}</Text>
        </View>
      </View>
      {/* Answer Template */}
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
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Answer Template:</Text>
              {" "}{question.answerTemplate || 'No answer template provided'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{ padding: 12 }}
        className="w-full bg-green-100 rounded-[10px] border-2 border-lime-400">
        <View className="flex-row items-start">
          <Image
            style={{ width: 15, height: 13, marginRight: 12 }}
            source={require('../../../assets/icons/feedback.png')}
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text style={{ fontSize: 14 }} className="text-black">
              <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>Feedback:</Text>
              {" "}{question.feedback || 'No feedback provided'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
