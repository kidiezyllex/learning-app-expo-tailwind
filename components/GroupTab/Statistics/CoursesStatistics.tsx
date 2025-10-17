import { courseStatistics } from '@/data/statisticsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { Text, View } from 'react-native';
import ProgressCard from '../../Common/ProgressCard';

export default function CoursesStatistics() {
  return (
    <View 
    style={{
      borderRadius: getScaleFactor() * 12,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    }}
    className="p-4 mb-4 w-full bg-white">
      <Text className="mb-4 text-base font-semibold text-black">
        Courses Statistics
      </Text>

      {/* Course Cards */}
      <View style={{ gap: getScaleFactor() * 20 }} className="flex-col">
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
