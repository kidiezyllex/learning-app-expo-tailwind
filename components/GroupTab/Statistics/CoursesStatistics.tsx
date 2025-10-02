import { courseStatistics } from '@/data/statisticsMockData';
import { Text, View } from 'react-native';
import ProgressCard from '../../Common/ProgressCard';

export default function CoursesStatistics() {
  return (
    <View 
    style={{
      borderRadius: 12,
      backgroundColor: '#FFF',
    }}
    className="p-4 mb-4 w-full bg-white shadow-sm">
      <Text style={{ fontSize: 24 }} className="mb-4 font-semibold text-black">
        Courses Statistics
      </Text>

      {/* Course Cards */}
      <View style={{ gap: 20 }} className="flex-col">
        {courseStatistics.map((course, index) => (
          <ProgressCard
          key={course.id}
          course={course as any}
          onPress={() => {}}
        />
        ))}
      </View>
    </View>
  );
}
