import "@/global.css";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="bg-yellow-500 w-full h-screen flex-1 p-3">
      <View className="flex-1 bg-white rounded-xl pt-6 items-center justify-center">
        <Text className="text-4xl font-bold text-zinc-900 text-center">
          Swastik <Text className="italic ml-1 text-green-600">Kalachuda</Text>
        </Text>
      </View>
    </View>
  );
}
