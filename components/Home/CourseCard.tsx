import { Course } from '@/data/mockData';
import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
  onMorePress?: () => void;
}

export default function CourseCard({ course, onPress, onMorePress }: CourseCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`mb-4 bg-white rounded-[10px] shadow-sm p-4 relative transform transition-transform ${isPressed ? 'opacity-90 scale-98' : 'scale-100'
        }`}
    >
      {/* More Options Button */}
      <TouchableOpacity
        onPress={onMorePress}
        className="absolute right-3 top-1/2 p-1 -translate-y-1/2"
      >
        <Image
          source={require('../../assets/icons/chevron-right.png')}
          style={{ width: 7, height: 14 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Course Title */}
      <Text className="pr-5 mb-3 text-xl font-semibold text-black">
        {course.title}
      </Text>

      {/* User Info */}
      <View className="flex-row items-center mb-4">
        <Image
          source={require('../../assets/icons/user.png')}
          style={{ width: 30, height: 30 }}
          resizeMode="cover"
        />
        <Text className="ml-3 text-lg font-medium text-zinc-600">
          {course.userName}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="mb-3">
        <ProgressBar progress={course.completionRate} />
      </View>

      {/* Completed Tests */}
      <Text className="text-base font-medium text-black">
        Bài kiểm tra đã hoàn thành: {course.completedTests}
      </Text>
    </Pressable>
  );
}
