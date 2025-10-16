import { learningTimeData, userLearningData } from '@/data/statisticsMockData';
import { Image, Text, View } from 'react-native';
import { icons } from '../../../assets/icons/icons';

export default function LearningTime() {
  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: '#FFF',
      }}
      className="p-4 mb-4 w-full shadow-sm">
      <Text className="mb-4 text-base font-semibold text-black">
        Learning Time
      </Text>

      {/* Statistics Cards */}
      <View className="mb-4">
        {/* Total Learning Time */}
        <View style={{ gap: 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.clock4}
              style={{ width: 35, height: 35 }}
              className="mr-4"
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

        {/* Average Learning Time */}
        <View style={{ gap: 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.history}
              style={{ width: 32, height: 32 }}
              className="mr-4"
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
        <View style={{ gap: 16 }} className="flex-row items-center">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={icons.user}
              style={{ width: 31, height: 31 }}
              className="mr-4"
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
          borderRadius: 10,
          backgroundColor: '#FFF',
        }}
        className="shadow-sm"
      >
        {/* Table Header */}
        <View className="px-4 py-3 bg-gray-200 rounded-t-lg">
          <View className="flex-row">
            <Text style={{ width: 48 }} className="text-xs font-medium text-center text-black">
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
            <Text style={{ width: 48 }} className="font-medium text-zinc-600 w-[48px] text-center text-xs">
              {user.rank}
            </Text>
            <Text className="flex-1 text-xs font-medium text-zinc-600">
              {user.totalTime}
            </Text>
            <Text className="flex-1 text-xs font-medium text-center text-zinc-600">
              {user.averageTime}
            </Text>
            <View style={{ gap: 8 }} className="flex-row flex-1 items-center">
            <Image
              source={icons.user}
              style={{ width: 24, height: 24 }}
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
