import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { examResultMockData, QuestionResult } from '../../data/examResultMockData';
import Button from '../Common/Button';
import ScreenHeader from '../Common/ScreenHeader';

interface ExamResultScreenProps {
  onBack?: () => void;
}

export default function ExamResultScreen({ onBack }: ExamResultScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const data = examResultMockData;

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const renderQuestionNumber = (number: number, index: number) => {
    const isActive = index === currentQuestionIndex;
    return (
      <TouchableOpacity
        key={number}
        onPress={() => handleQuestionSelect(index)}
        className={`w-10 h-10 rounded-full ${
          isActive ? 'bg-blue-500' : 'bg-neutral-200'
        } ${index === 0 ? 'border-2 border-zinc-600' : ''}`}
      >
        <Text 
          style={{ fontSize: 16 }} 
          className={`font-medium text-center mt-2 ${
            isActive ? 'text-white' : 'text-zinc-600'
          }`}
        >
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQuestionCard = (question: QuestionResult) => (
    <View 
      key={question.id}
      className="w-full bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] p-6 mb-4"
    >
      {/* Question Text */}
      <Text 
        style={{ fontSize: 24 }} 
        className="mb-4 font-semibold text-black"
      >
        Question {question.questionNumber}: {question.questionText}
      </Text>

      {/* Answer Template */}
      <View 
        className={`w-full p-4 rounded-[10px] border-2 mb-4 ${
          question.isGraded 
            ? 'bg-amber-100 border-amber-400' 
            : 'bg-neutral-100 border-zinc-300'
        }`}
      >
        <View className="flex-row items-start">
          <View 
            className={`w-3 h-4 mr-2 mt-1 ${
              question.isGraded ? 'bg-amber-500' : 'bg-neutral-400'
            }`}
          />
          <View className="flex-1">
            <Text style={{ fontSize: 14 }} className="mb-1 font-bold text-black">
              Answer Template:
            </Text>
            <Text style={{ fontSize: 14 }} className="font-normal text-black">
              {question.answerTemplate}
            </Text>
          </View>
        </View>
      </View>

      {/* Score Section */}
      <View className="flex-row items-center mb-4">
        <Text style={{ fontSize: 16 }} className="mr-4 font-semibold text-black">
          {question.isGraded ? 'Chấm điểm:' : 'Điểm số:'}
        </Text>
        <View 
          className={`px-6 py-2 rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] border-2 ${
            question.isGraded ? 'border-red-600' : 'border-red-600'
          }`}
        >
          <Text 
            style={{ fontSize: 18 }} 
            className={`font-semibold ${
              question.isGraded ? 'text-red-600' : 'text-red-600'
            }`}
          >
            {question.score}/{question.maxScore}
          </Text>
        </View>
      </View>

      {/* Feedback Section */}
      {question.isGraded && (
        <View className="w-full p-4 bg-green-100 rounded-[10px] border-2 border-lime-400">
          <View className="flex-row items-start">
            <View className="w-3.5 h-3.5 mr-2 mt-1 outline outline-[1.67px] outline-offset-[-0.83px] outline-lime-500" />
            <View className="flex-1">
              <Text style={{ fontSize: 16 }} className="mb-1 font-bold text-black">
                Feedback:
              </Text>
              <Text style={{ fontSize: 16 }} className="font-normal text-black">
                {question.feedback}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-100">
      {/* Header */}
      <ScreenHeader title="Result" onBack={onBack} />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 pt-6">
          {/* Exam Info Card */}
          <View className="w-full h-16 bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] p-4 mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                  {data.examTitle}
                </Text>
              </View>
              <View className="w-14 h-7 bg-green-600 rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]">
                <Text 
                  style={{ fontSize: 10 }} 
                  className="mt-1 font-medium text-center text-black"
                >
                  Exam
                </Text>
              </View>
            </View>
            <View className="mt-2 w-full h-0 border border-stone-300" />
          </View>

          {/* Student Info */}
          <View className="flex-row items-center mb-4">
            <Image
              source={require('../../assets/images/sample-avatar.png')}
              className="mr-4 w-12 h-12 rounded-full"
              resizeMode="cover"
            />
            <Text style={{ fontSize: 24 }} className="font-semibold text-black">
              {data.studentName}
            </Text>
          </View>

          {/* Question Numbers */}
          <View className="flex-row justify-center mb-6" style={{ gap: 20 }}>
            {data.questionNumbers.map((number: number, index: number) => 
              renderQuestionNumber(number, index)
            )}
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

          {/* Navigation Buttons */}
          <View className="flex-row justify-between mt-6">
            <Button 
              text="Previous" 
              onPress={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            />
            <Button 
              text="Next" 
              onPress={() => setCurrentQuestionIndex(Math.min(data.questions.length - 1, currentQuestionIndex + 1))}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
