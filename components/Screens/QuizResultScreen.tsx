import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { QuizQuestion, quizResultMockData } from '../../data/quizResultMockData';
import Button from '../Common/Button';
import ScreenHeader from '../Common/ScreenHeader';

interface QuizResultScreenProps {
  onBack?: () => void;
}

export default function QuizResultScreen({ onBack }: QuizResultScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const data = quizResultMockData;

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const renderQuestionNumber = (number: number, index: number) => {
    const isActive = index === currentQuestionIndex;
    const isCorrect = data.questions[index]?.answers.some(answer =>
      answer.isSelected && answer.isCorrect
    ) || false;

    return (
      <TouchableOpacity
        key={number}
        onPress={() => handleQuestionSelect(index)}
        className={`w-11 h-11 rounded-full ${isCorrect
          ? 'bg-green-200 border-2 border-blue-500'
          : 'bg-rose-200'
          }`}
      >
        <Text
          style={{ fontSize: 20 }}
          className={`font-bold text-center mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
        >
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

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
    }

    return (
      <View
      style={{ paddingHorizontal: 20, paddingVertical: 24, gap: 20 }}
        key={answer.id}
        className={`w-full ${bgColor} flex-row items-center rounded-[10px] border-2 ${borderColor} mb-4 ${answer.isSelected && answer.isCorrect ? 'shadow-sm' : ''
          }`}
      >
          <View
            style={{ width: 24, height: 24, minWidth: 24, minHeight: 24, flexShrink: 0}}
            className={`rounded-full ${answer.isSelected ? dotColor : 'outline outline-2 outline-zinc-400'
              }`}
          />
          <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-black">
            {answer.text}
          </Text>
      </View>
    );
  };

  const renderQuestionCard = (question: QuizQuestion) => (
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
      <View className="mb-6">
        {question.answers.map((answer, index) =>
          renderAnswerOption(answer, index)
        )}
      </View>

      {/* Explanation */}
      <View className="w-full p-4 bg-amber-100 rounded-[10px] border-2 border-amber-400">
        <View className="flex-row items-start">
          <View className="mt-1 mr-2 w-3 h-4 bg-amber-500" />
          <View className="flex-1">
            <Text style={{ fontSize: 14 }} className="mb-1 font-bold text-black">
              Explaination:
            </Text>
            <Text style={{ fontSize: 14 }} className="font-normal text-black">
              {question.explanation}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Header */}
      <ScreenHeader title="Result" onBack={onBack} />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-11 pt-6">
          {/* Quiz Info Card */}
          <View className="w-full bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] mb-4">
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 24 }}
              className="flex-row justify-between items-center">
              <View className="flex-row flex-1 gap-1">
                <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                  Game Object  -
                </Text>
                <Text style={{ fontSize: 24 }} className="text-black">
                  Bài kiểm tra cuối khóa
                </Text>
              </View>

              <View style={{ height: 28, paddingHorizontal: 14 }} className="flex justify-center items-center bg-orange-400 rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]">
                <Text
                  style={{ fontSize: 12 }}
                  className="font-medium text-center text-black"
                >
                  Quiz
                </Text>
              </View>
            </View>
            <View className="w-full h-0 border border-stone-300" />
            {/* Student Info */}
            <View
              style={{ padding: 16 }}
              className="flex-row items-center">
              <TouchableOpacity
              >
                <Image
                  style={{ width: 52, height: 52, minWidth: 52, minHeight: 52, flexShrink: 0, marginRight: 20 }}
                  source={require('../../assets/images/sample-avatar.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                {data.studentName}
              </Text>
            </View>
          </View>

          {/* Pagination */}
          <View className="flex-row justify-center items-center mb-10" style={{ gap: 20 }}>
            <TouchableOpacity
            >
              <Image
                style={{ width: 20, height: 34 }}
                source={require('../../assets/icons/left-angle.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {data.questionNumbers.map((number: number, index: number) =>
              renderQuestionNumber(number, index)
            )}
            <TouchableOpacity
            >
              <Image
                style={{ width: 20, height: 34 }}
                source={require('../../assets/icons/right-angle.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Current Question Card */}
          {renderQuestionCard(data.questions[currentQuestionIndex])}

          {/* Grade Button */}
          <View className="items-center mt-6">
            <Button
              text="Grade"
              onPress={() => { }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
