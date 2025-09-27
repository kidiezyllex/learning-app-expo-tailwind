import { Course } from '@/data/mockData';
import { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from '../HomeTab/ProgressBar';

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
  onMorePress?: () => void;
}

export default function ProgressCard({ course, onPress, onMorePress }: CourseCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={{
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
        minHeight: 134
      }}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`flex flex-col justify-between bg-white rounded-[10px] shadow-sm p-4 relative transform transition-transform ${isPressed ? 'opacity-90 scale-98' : 'scale-100'
        }`}
    >
      {/* More Options Button */}
      <TouchableOpacity
        onPress={onMorePress}
        style={{
          top: '50%',
        }}
        className="absolute right-3 p-1"
      >
        <Image
          source={require('../../assets/icons/chevron-right.png')}
          style={{ width: 10, height: 21 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Course Title */}
      <Text style={{ fontSize: 24 }} className="mb-3 font-semibold text-black line-clamp-1">
        {course.title}
      </Text>

      {/* User Info */}
      {course.userName && <View className="flex-row items-center mb-5">
        <Image
          source={require('../../assets/icons/user.png')}
          style={{ width: 45, height: 45 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 20 }} className="ml-3 font-medium text-zinc-600">
          {course.userName}
        </Text>
      </View>}

      {/* Progress Bar */}
      <View>
        <ProgressBar progress={course.completionRate} />
      </View>

      {/* Completed Tests */}
      {course.completedTests > -1 && <Text style={{ fontSize: 20, marginTop: 14 }} className="font-medium text-black">
        Bài kiểm tra đã hoàn thành: {course.completedTests}
      </Text>
      }
    </Pressable>
  );
}
