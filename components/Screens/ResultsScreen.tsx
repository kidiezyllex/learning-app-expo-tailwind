import { ScrollView, Text, View } from "react-native";

// Components
import Efficiency from "@/components/Result/Efficiency";
import WeekChart from "@/components/Result/WeekChart";

export default function ResultsScreen() {
  return (
    <View className="flex-1 bg-neutral-100 pt-[102px]">
      {/* Header */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999, // Đảm bảo nằm trên cùng
      }}>
        <View className="flex flex-row justify-center items-center h-[102px] px-6 bg-blue-600">
          <Text style={{ fontSize: 36 }} className="font-semibold text-white">
            Kết quả
          </Text>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        <View className="px-6">
          {/* Week Chart Section */}
          <View className="mb-6">
            <Text style={{ fontSize: 32, marginVertical: 32}} className="font-medium text-neutral-950">
              Tuần này
            </Text>
            <WeekChart />
          </View>

          {/* Efficiency Section */}
          <View>
            <Text style={{ fontSize: 24 }} className="mb-4 font-medium text-black">
              Hiệu suất
            </Text>
            <Efficiency />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
