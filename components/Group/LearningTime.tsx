import { learningTimeData, userLearningData } from '@/data/statisticsMockData';
import { Image, Text, View } from 'react-native';

export default function LearningTime() {
  return (
    <View className="w-full bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* Header */}
      <Text style={{ fontSize: 20 }} className="font-semibold text-black mb-6">
        Learning Time
      </Text>

      {/* Statistics Cards */}
      <View className="mb-6">
        {/* Total Learning Time */}
        <View className="flex-row items-center mb-4">
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{ width: 35, height: 35 }}
            className="mr-4"
          />
          <Text style={{ fontSize: 20 }} className="font-medium text-black flex-1">
            Total Learning Time:
          </Text>
          <Text style={{ fontSize: 16 }} className="font-medium text-black">
            {learningTimeData.totalTime}
          </Text>
        </View>

        {/* Average Learning Time */}
        <View className="flex-row items-center mb-4">
          <Image
            source={require('../../assets/icons/clock2.png')}
            style={{ width: 32, height: 32 }}
            className="mr-4"
          />
          <Text style={{ fontSize: 20 }} className="font-medium text-black flex-1">
            Average Learning Time:
          </Text>
          <Text style={{ fontSize: 16 }} className="font-medium text-black">
            {learningTimeData.averageTime}
          </Text>
        </View>

        {/* Top Learner */}
        <View className="flex-row items-center">
          <Image
            source={require('../../assets/icons/star.png')}
            style={{ width: 35, height: 35 }}
            className="mr-4"
          />
          <Text style={{ fontSize: 20 }} className="font-medium text-black flex-1">
            Top Learning (yesterday):
          </Text>
          <Text style={{ fontSize: 16 }} className="font-medium text-black">
            {learningTimeData.topLearner}
          </Text>
        </View>
      </View>

      {/* Leaderboard Table */}
      <View className="bg-white rounded-lg shadow-sm">
        {/* Table Header */}
        <View className="bg-gray-200 rounded-t-lg px-4 py-3">
          <View className="flex-row">
            <Text style={{ fontSize: 16 }} className="font-medium text-black w-[24px]">
              #
            </Text>
            <Text style={{ fontSize: 16 }} className="font-medium text-black flex-1">
              Total Learning Time
            </Text>
            <Text style={{ fontSize: 16 }} className="font-medium text-black w-[144px] text-center">
              Avg Learning Time (per day)
            </Text>
            <Text style={{ fontSize: 16 }} className="font-medium text-black w-[56px] text-center">
              Name
            </Text>
          </View>
        </View>

        {/* Table Rows */}
        {userLearningData.map((user, index) => (
          <View key={user.id} className={`flex-row items-center px-4 py-3 ${index < userLearningData.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <Text style={{ fontSize: 16 }} className="font-medium text-zinc-600 w-[24px]">
              {user.rank}
            </Text>
            <Text style={{ fontSize: 14 }} className="font-medium text-zinc-600 flex-1">
              {user.totalTime}
            </Text>
            <Text style={{ fontSize: 14 }} className="font-medium text-zinc-600 w-[144px] text-center">
              {user.averageTime}
            </Text>
            <View className="w-[56px] items-center">
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 24, height: 24 }}
                className="rounded-full"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
