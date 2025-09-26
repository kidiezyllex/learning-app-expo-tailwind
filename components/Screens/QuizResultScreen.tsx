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
        className={`w-11 h-11 rounded-full ${
          isCorrect 
            ? 'bg-green-200 border-2 border-blue-500' 
            : 'bg-rose-200'
        }`}
      >
        <Text 
          style={{ fontSize: 20 }} 
          className={`font-bold text-center mt-2 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
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
        key={answer.id}
        className={`w-full h-20 ${bgColor} rounded-[10px] border-2 ${borderColor} mb-4 ${
          answer.isSelected && answer.isCorrect ? 'shadow-[0px_0px_4px_0px_rgba(44,107,190,1.00)]' : ''
        }`}
      >
        <View className="flex-row items-center p-4 h-full">
          <View 
            className={`w-6 h-6 rounded-full mr-4 ${
              answer.isSelected ? dotColor : 'outline outline-2 outline-zinc-400'
            }`}
          />
          <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-black">
            {answer.text}
          </Text>
        </View>
      </View>
    );
  };

  const renderQuestionCard = (question: QuizQuestion) => (
    <View 
      key={question.id}
      className="w-full bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] p-6 mb-4"
    >
      {/* Question Text */}
      <Text 
        style={{ fontSize: 20 }} 
        className="mb-6 font-semibold text-black"
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
    <View className="flex-1 pt-[80px]">
      {/* Header */}
      <ScreenHeader title="Result" onBack={onBack} />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 pt-6">
          {/* Quiz Info Card */}
          <View className="w-full h-40 bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                  {data.quizTitle}
                </Text>
              </View>
              <View className="w-14 h-7 bg-orange-400 rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]">
                <Text 
                  style={{ fontSize: 10 }} 
                  className="mt-1 font-medium text-center text-black"
                >
                  Qizz
                </Text>
              </View>
            </View>
            <View className="mt-2 mb-4 w-full h-0 border border-stone-300" />
            
            {/* Student Info */}
            <View className="flex-row items-center">
              <Image
                source={require('../../assets/images/sample-avatar.png')}
                className="mr-4 w-12 h-12 rounded-full"
                resizeMode="cover"
              />
              <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                {data.studentName}
              </Text>
            </View>
          </View>

          {/* Question Numbers */}
          <View className="flex-row justify-center mb-6" style={{ gap: 20 }}>
            {data.questionNumbers.map((number, index) => 
              renderQuestionNumber(number, index)
            )}
            <View className="justify-center w-10 h-16">
              <Text style={{ fontSize: 36 }} className="font-bold text-center text-blue-500">
                ...
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="w-full h-2 bg-zinc-300 rounded-[20px] mb-6">
            <View 
              className="h-2 bg-blue-500 rounded-[20px]"
              style={{ width: `${((currentQuestionIndex + 1) / data.questionNumbers.length) * 100}%` }}
            />
          </View>

          {/* Current Question Card */}
          {renderQuestionCard(data.questions[currentQuestionIndex])}

          {/* Grade Button */}
          <View className="items-center mt-6">
            <Button 
              text="Grade" 
              onPress={() => {
                // Handle grading logic here
                console.log('Grading quiz...');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
