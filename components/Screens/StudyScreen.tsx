import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
export default function StudyScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-3 z-10"
          >
            <Image
              style={{ width: 69, height: 69 }}
              source={require('../../assets/icons/left-arrow.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="flex-1 justify-center items-center">
            <Text
              style={{ fontSize: 32 }}
              className="font-medium text-white">
              Study Screen Sample
            </Text>
          </View>
          <View style={{ gap: 16 }} className='absolute right-6 flex-row items-center'>
            <TouchableOpacity
            >
              <Image
                style={{ width: 51, height: 51 }}
                source={require('../../assets/icons/bell.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image
                style={{ width: 39, height: 41 }}
                source={require('../../assets/icons/logout.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
     
      </ScrollView>
    </View>
  );
}
