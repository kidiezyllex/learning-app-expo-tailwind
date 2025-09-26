import { learningTimeData, userLearningData } from '@/data/statisticsMockData';
import { Image, Text, View } from 'react-native';

export default function LearningTime() {
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
        Learning Time
      </Text>

      {/* Statistics Cards */}
      <View className="mb-4">
        {/* Total Learning Time */}
        <View style={{ gap: 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={require('../../../assets/icons/clock4.png')}
              style={{ width: 35, height: 35 }}
              className="mr-4"
            />
            <Text style={{ fontSize: 20 }} className="flex-1 font-medium text-black">
              Total Learning Time:
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text style={{ fontSize: 16 }} className="font-medium text-right text-black">
              {learningTimeData.totalTime}
            </Text>
          </View>
        </View>

        {/* Average Learning Time */}
        <View style={{ gap: 16 }} className="flex-row items-center mb-4">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={require('../../../assets/icons/history.png')}
              style={{ width: 32, height: 32 }}
              className="mr-4"
            />
            <Text style={{ fontSize: 20 }} className="flex-1 font-medium text-black">
              Average Learning Time:
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text style={{ fontSize: 16 }} className="font-medium text-right text-black">
              {learningTimeData.averageTime}
            </Text>
          </View>
        </View>

        {/* Top Learner */}
        <View style={{ gap: 16 }} className="flex-row items-center">
          {/* Left */}
          <View className='flex-row flex-1 items-center'>
            <Image
              source={require('../../../assets/icons/user.png')}
              style={{ width: 31, height: 31 }}
              className="mr-4"
            />
            <Text style={{ fontSize: 20 }} className="flex-1 font-medium text-black">
              Top Learning (yesterday):
            </Text>
          </View>
          {/* Right */}
          <View className='flex-1'>
            <Text style={{ fontSize: 16 }} className="font-medium text-right text-black">
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
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        {/* Table Header */}
        <View className="px-4 py-3 bg-gray-200 rounded-t-lg">
          <View className="flex-row">
            <Text style={{ fontSize: 16, width: 48 }} className="font-medium text-center text-black">
              #
            </Text>
            <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-black">
              Total Learning Time
            </Text>
            <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-center text-black">
              Avg Learning Time (per day)
            </Text>
            <Text style={{ fontSize: 16 }} className="flex-1 font-medium text-center text-black">
              Name
            </Text>
          </View>
        </View>

        {/* Table Rows */}
        {userLearningData.map((user, index) => (
          <View key={user.id} className={`flex-row items-center px-4 py-3 ${index < userLearningData.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <Text style={{ fontSize: 16, width: 48 }} className="font-medium text-zinc-600 w-[48px] text-center">
              {user.rank}
            </Text>
            <Text style={{ fontSize: 14 }} className="flex-1 font-medium text-zinc-600">
              {user.totalTime}
            </Text>
            <Text style={{ fontSize: 14 }} className="flex-1 font-medium text-center text-zinc-600">
              {user.averageTime}
            </Text>
            <View style={{ gap: 8 }} className="flex-row flex-1 items-center">
            <Image
              source={require('../../../assets/icons/user.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
              <Text style={{ fontSize: 14 }} className="font-medium text-zinc-600">
                {user.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
