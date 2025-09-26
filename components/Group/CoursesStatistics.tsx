import { courseStatistics } from '@/data/statisticsMockData';
import { Text, View } from 'react-native';
import ProgressCard from '../Common/ProgressCard';

export default function CoursesStatistics() {
  return (
    <View 
    style={{
      borderRadius: 12,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    }}
    className="p-4 mb-4 w-full bg-white">
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
