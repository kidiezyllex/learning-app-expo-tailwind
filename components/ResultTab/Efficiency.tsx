import { exerciseResults } from '@/data/resultsMockData';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Efficiency() {
  return (
    <View className="w-full">
      {/* Efficiency Statistics */}
      <View style={{ borderRadius: 12 }} className="overflow-hidden mb-4 bg-white shadow-sm">
        {/* Tổng thời gian xem */}
        <View className="flex-row justify-between items-center" style={{ padding: 16, paddingRight: 28 }}>
          <View style={{ width: 78 }} className="justify-start">
            <Image
              source={require('../../assets/icons/clock3.png')}
              style={{ width: 50, height: 50 }}
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
              source={require('../../assets/icons/chevron-right.png')}
              style={{ width: 10, height: 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>

        {/* Bài tập của tôi */}
        <View className="flex-row justify-between items-center" style={{ padding: 16, paddingRight: 28 }}>
          <View style={{ width: 78 }} className="justify-start">
            <Image
              source={require('../../assets/icons/book.png')}
              style={{ width: 40, height: 50 }}
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
              source={require('../../assets/icons/chevron-right.png')}
              style={{ width: 10, height: 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Exercise Results */}
        <View >
          {exerciseResults.map((exercise, index) => (
            <View key={exercise.id}>
              <View className="flex-row justify-between items-center" style={{ paddingLeft: 80, paddingRight: 60, paddingVertical: 20 }}>
                <View style={{ width: 62 }} className="justify-start">
                  <Image
                    source={require('../../assets/icons/check.png')}
                    style={{ width: 39, height: 39 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                  <Text
                    style={{ color: '#000', fontSize: 20, fontWeight: '500' }}
                    numberOfLines={2}
                    className="mb-1"
                  >
                    Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người
                  </Text>
                  <Text style={{ color: '#737373', fontSize: 16, fontWeight: '500' }}>
                    User Name
                  </Text>
                </View>

                <Text style={{ color: '#000', fontSize: 20, fontWeight: '500' }}>
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
          <View style={{ width: 78 }} className="justify-start">
            <Image
              source={require('../../assets/icons/clock3.png')}
              style={{ width: 50, height: 50 }}
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
              source={require('../../assets/icons/chevron-right.png')}
              style={{ width: 10, height: 21 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Exercise Results */}
        <View >
          {exerciseResults.map((exercise, index) => (
            <View key={exercise.id}>
              <View className="flex-row justify-between items-center" style={{ paddingLeft: 80, paddingRight: 60, paddingVertical: 20 }}>
                <View style={{ width: 62 }} className="justify-start">
                  <Image
                    source={require('../../assets/icons/check.png')}
                    style={{ width: 39, height: 39 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                  <Text
                    style={{ color: '#000', fontSize: 20, fontWeight: '500' }}
                    numberOfLines={2}
                    className="mb-1"
                  >
                    Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người
                  </Text>
                  <Text style={{ color: '#737373', fontSize: 16, fontWeight: '500' }}>
                    User Name
                  </Text>
                </View>

                <Text style={{ color: '#000', fontSize: 20, fontWeight: '500' }}>
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
