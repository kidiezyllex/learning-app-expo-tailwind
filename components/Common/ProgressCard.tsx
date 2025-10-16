import { Course } from '@/data/mockData';
import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
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
        borderRadius: getScaleFactor() * 10,
        backgroundColor: '#FFF',
        minHeight: getScaleFactor() * 134
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
          right: getScaleFactor() * 12,
        }}
        className="absolute p-1"
      >
        <Image
          source={icons.chevronRight}
          style={{ width: getScaleFactor() * 10, height: getScaleFactor() * 21 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Course Title */}
      <Text style={{ marginBottom: getScaleFactor() * 12 }} className="text-base font-semibold text-black line-clamp-1">
        {course.title}
      </Text>

      {/* User Info */}
      {course.userName && <View style={{ marginBottom: getScaleFactor() * 20 }} className="flex-row items-center">
        <Image
          source={icons.user}
          style={{ width: getScaleFactor() * 45, height: getScaleFactor() * 45 }}
          resizeMode="cover"
        />
        <Text className="ml-3 text-sm font-medium text-zinc-600">
          {course.userName}
        </Text>
      </View>}

      {/* Progress Bar */}
      <View>
        <ProgressBar progress={course.completionRate} />
      </View>

      {/* Completed Tests */}
      {course.completedTests > -1 && <Text style={{ marginTop: 14 }} className="text-sm font-medium text-black">
        Bài kiểm tra đã hoàn thành: {course.completedTests}
      </Text>
      }
    </Pressable>
  );
}
