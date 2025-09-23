import { courseStatistics } from '@/data/statisticsMockData';
import { Text, View } from 'react-native';

export default function CoursesStatistics() {
  return (
    <View className="p-6 w-full bg-white rounded-xl shadow-sm">
      {/* Header */}
      <Text style={{ fontSize: 20 }} className="mb-6 font-semibold text-black">
        Courses Statistics
      </Text>

      {/* Course Cards */}
      <View className="space-y-4">
        {courseStatistics.map((course, index) => (
          <View key={course.id} className="p-4 bg-white rounded-lg shadow-sm">
            {/* Course Title */}
            <Text style={{ fontSize: 20 }} className="mb-4 font-semibold text-black">
              {course.title}
            </Text>

            {/* Progress Bar */}
            <View className="relative">
              {/* Background Progress Bar */}
              <View className="w-full h-6 rounded-3xl shadow-sm bg-zinc-300" />
              
              {/* Progress Fill */}
              <View 
                className="absolute top-0 left-0 h-6 bg-amber-400 rounded-3xl shadow-sm"
                style={{ width: `${course.progress}%` }}
              />
              
              {/* Progress Text */}
              <Text style={{ fontSize: 20 }} className="absolute top-0 left-1/2 font-medium text-black transform -translate-x-1/2">
                {course.progressText}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
