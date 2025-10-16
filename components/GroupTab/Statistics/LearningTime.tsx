import { learningTimeData, userLearningData } from '@/data/statisticsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, View } from 'react-native';
import { icons } from '../../../assets/icons/icons';

export default function LearningTime() {
  return (
    <View
      style={{
        borderRadius: getScaleFactor() * 12,
        backgroundColor: '#FFF',
      }}
      className="p-4 mb-4 w-full shadow-sm">
      <Text className="mb-4 text-base font-semibold text-black">
        Learning Time
      </Text>

      {/* Statistics Cards */}
      <View className="mb-4">
        <View style={{ gap: getScaleFactor() * 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.clock4}
              style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35, marginRight: getScaleFactor() * 16 }}
            />
            <Text className="flex-1 text-sm font-medium text-black">
              Total Learning Time:
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text className="text-xs font-medium text-right text-black">
              {learningTimeData.totalTime}
            </Text>
          </View>
        </View>

        <View style={{ gap: getScaleFactor() * 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.history}
              style={{ width: getScaleFactor() * 32, height: getScaleFactor() * 32, marginRight: getScaleFactor() * 16 }}
            />
            <Text className="flex-1 text-sm font-medium text-black">
              Average Learning Time:
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text className="text-xs font-medium text-right text-black">
              {learningTimeData.averageTime}
            </Text>
          </View>
        </View>

        {/* Top Learner */}
        <View style={{ gap: getScaleFactor() * 16 }} className="flex-row items-center">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.user}
              style={{ width: getScaleFactor() * 31, height: getScaleFactor() * 31, marginRight: getScaleFactor() * 16 }}
            />
            <Text className="flex-1 text-sm font-medium text-black">
              Top Learning (yesterday):
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text className="text-xs font-medium text-right text-black">
              {learningTimeData.topLearner}
            </Text>
          </View>
        </View>
      </View>

      {/* Leaderboard Table */}
      <View
        style={{
          borderRadius: getScaleFactor() * 10,
          backgroundColor: '#FFF',
        }}
        className="shadow-sm"
      >
        {/* Table Header */}
        <View className="px-4 py-3 bg-gray-200 rounded-t-lg">
          <View className="flex-row">
            <Text style={{ width: getScaleFactor() * 48 }} className="text-xs font-medium text-center text-black">
              #
            </Text>
            <Text className="text-xs font-medium text-black">
              Total Learning Time
            </Text>
            <Text className="text-xs font-medium text-center text-black">
              Avg Learning Time (per day)
            </Text>
            <Text className="text-xs font-medium text-center text-black">
              Name
            </Text>
          </View>
        </View>

        {/* Table Rows */}
        {userLearningData.map((user, index) => (
          <View key={user.id} className={`flex-row items-center px-4 py-3 ${index < userLearningData.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <Text style={{ width: getScaleFactor() * 48 }} className="text-xs font-medium text-center text-zinc-600">
              {user.rank}
            </Text>
            <Text className="flex-1 text-xs font-medium text-zinc-600">
              {user.totalTime}
            </Text>
            <Text className="flex-1 text-xs font-medium text-center text-zinc-600">
              {user.averageTime}
            </Text>
            <View style={{ gap: getScaleFactor() * 8 }} className="flex-row flex-1 items-center">
            <Image
              source={icons.user}
              style={{ width: getScaleFactor() * 24, height: getScaleFactor() * 24 }}
              resizeMode="contain"
            />
              <Text className="text-xs font-medium text-zinc-600">
                {user.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
