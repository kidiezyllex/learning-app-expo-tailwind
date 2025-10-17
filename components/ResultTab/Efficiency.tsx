import { exerciseResults } from '@/data/resultsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';

export default function Efficiency() {
  return (
    <View className="w-full">
      {/* Efficiency Statistics */}
      <View 
        style={{ 
          borderRadius: getScaleFactor() * 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }} 
        className="overflow-hidden mb-4 bg-white">
        {/* Tổng thời gian xem */}
        <View className="flex-row justify-between items-center" style={{ padding: 16, paddingRight: 28 }}>
          <View style={{ width: getScaleFactor() * 78 }} className="justify-start">
            <Image
              source={icons.clock3}
              style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 50 }}
              resizeMode="contain"
            />
          </View>

          <View className="flex-1">
            <Text style={{ color: '#000', fontSize: 26, fontWeight: '500' }}>
              Tổng thời gian xem
            </Text>
            <Text style={{ color: '#737373', fontSize: 26, fontWeight: '500' }}>
              45 Giờ
            </Text>
          </View>

          <TouchableOpacity>
            <Image
              className='transform scale-125'
              source={icons.chevronRight}
              style={{ width: getScaleFactor() * 10, height: getScaleFactor() * 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>

        {/* Bài tập của tôi */}
        <View className="flex-row justify-between items-center" style={{ padding: 16, paddingRight: 28 }}>
          <View style={{ width: getScaleFactor() * 78 }} className="justify-start">
            <Image
              source={icons.book}
              style={{ width: getScaleFactor() * 40, height: getScaleFactor() * 50 }}
              resizeMode="contain"
            />
          </View>

          <View className="flex-1">
            <Text style={{ color: '#000', fontSize: 26, fontWeight: '500' }}>
              Bài tập của tôi
            </Text>
          </View>

          <TouchableOpacity>
            <Image
              className='transform scale-125'
              source={icons.chevronRight}
              style={{ width: getScaleFactor() * 10, height: getScaleFactor() * 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Exercise Results */}
        <View >
          {exerciseResults.map((exercise, index) => (
            <View key={exercise.id}>
              <View className="flex-row justify-between items-center" style={{ paddingLeft: 80, paddingRight: 60, paddingVertical: 20 }}>
                <View style={{ width: getScaleFactor() * 62 }} className="justify-start">
                  <Image
                    source={icons.check}
                    style={{ width: getScaleFactor() * 39, height: getScaleFactor() * 39 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                  <Text
                    numberOfLines={2}
                    className="mb-1 text-sm font-medium text-[#000]"
                  >
                    Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người
                  </Text>
                  <Text className="text-xs font-medium text-[#737373]">
                    User Name
                  </Text>
                </View>

                <Text className="text-sm font-medium text-[#000]">
                  93/100
                </Text>
              </View>

              {index < exerciseResults.length - 1 && (
                <View className="h-0 border-t border-zinc-100" />
              )}
            </View>
          ))}
        </View>

        {/* Trung bình ngày */}
        <View className="flex-row justify-between items-center" style={{ padding: 16, paddingRight: 28 }}>
          <View style={{ width: getScaleFactor() * 78 }} className="justify-start">
            <Image
              source={icons.clock3}
              style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 50 }}
              resizeMode="contain"
            />
          </View>

          <View className="flex-1">
            <Text style={{ color: '#000', fontSize: 26, fontWeight: '500' }}>
              Trung bình ngày
            </Text>
          </View>

          <TouchableOpacity>
            <Image
              className='transform scale-125'
              source={icons.chevronRight}
              style={{ width: getScaleFactor() * 10, height: getScaleFactor() * 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Exercise Results */}
        <View >
          {exerciseResults.map((exercise, index) => (
            <View key={exercise.id}>
              <View className="flex-row justify-between items-center" style={{ paddingLeft: 80, paddingRight: 60, paddingVertical: 20 }}>
                <View style={{ width: getScaleFactor() * 62 }} className="justify-start">
                  <Image
                    source={icons.check}
                    style={{ width: getScaleFactor() * 39, height: getScaleFactor() * 39 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                  <Text
                    numberOfLines={2}
                    className="mb-1 text-sm font-medium text-[#000]"
                  >
                    Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người
                  </Text>
                  <Text 
                  className="text-xs font-medium text-[#737373]">
                    User Name
                  </Text>
                </View>

                <Text className='text-sm font-medium text-[#000]'>
                  93/100
                </Text>
              </View>

              {index < exerciseResults.length - 1 && (
                <View className="h-0 border-t border-zinc-100" />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
