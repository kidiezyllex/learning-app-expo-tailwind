import { efficiencyData, exerciseResults } from '@/data/resultsMockData';
import { Image, Text, View } from 'react-native';

export default function Efficiency() {
  const getIconSource = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return require('../../assets/icons/clock.png');
      case 'book':
        return require('../../assets/icons/book-saved.png');
      case 'chart':
        return require('../../assets/icons/chart.png');
      default:
        return require('../../assets/icons/clock.png');
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600';
      case 'black':
        return 'bg-black';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <View className="w-full">
      {/* Efficiency Statistics */}
      <View className="p-6 mb-4 bg-white rounded-xl shadow-sm">
        {efficiencyData.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center py-4">
              <View className={`w-12 h-12 ${getIconColor(item.color)} rounded-lg items-center justify-center mr-4`}>
                <Image
                  source={getIconSource(item.icon)}
                  style={{ width: 24, height: 24 }}
                  tintColor="white"
                />
              </View>
              
              <View className="flex-1">
                <Text style={{ fontSize: 20 }} className="mb-1 font-medium text-black">
                  {item.title}
                </Text>
                <Text style={{ fontSize: 20 }} className="font-medium text-neutral-500">
                  {item.value}
                </Text>
              </View>
              
              <Image
                source={require('../../assets/icons/chevron-right.png')}
                style={{ width: 10, height: 20 }}
                tintColor="#737373"
              />
            </View>
            
            {index < efficiencyData.length - 1 && (
              <View className="h-0 border-t border-zinc-100" />
            )}
          </View>
        ))}
      </View>

      {/* Exercise Results */}
      <View className="p-6 bg-white rounded-xl shadow-sm">
        {exerciseResults.map((exercise, index) => (
          <View key={exercise.id}>
            <View className="flex-row items-start py-4">
              <View className="mr-4 w-10 h-10 bg-emerald-600 rounded-full" />
              
              <View className="flex-1 mr-4">
                <Text style={{ fontSize: 16 }} className="mb-2 font-semibold text-black">
                  {exercise.title}
                </Text>
                <Text style={{ fontSize: 14 }} className="font-medium text-stone-500">
                  {exercise.userName}
                </Text>
              </View>
              
              <Text style={{ fontSize: 16 }} className="font-semibold text-black">
                {exercise.score}
              </Text>
            </View>
            
            {index < exerciseResults.length - 1 && (
              <View className="h-0 border-t border-zinc-100" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
