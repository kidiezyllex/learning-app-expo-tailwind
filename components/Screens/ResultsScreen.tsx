import { ScrollView, Text, View } from "react-native";

// Components
import Efficiency from "@/components/Result/Efficiency";
import WeekChart from "@/components/Result/WeekChart";

export default function ResultsScreen() {
  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 32
          }}
          className="font-medium text-white">
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
            <Text style={{ fontSize: 32, marginVertical: 28}} className="font-medium text-neutral-950">
              Tuần này
            </Text>
            <WeekChart />
          </View>

          {/* Efficiency Section */}
          <View>
          <Text style={{ fontSize: 32, marginBottom: 20}} className="font-medium text-neutral-950">
              Hiệu suất
            </Text>
            <Efficiency />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
