import ScreenHeader from "@/components/Common/ScreenHeader";
import Efficiency from "@/components/Result/Efficiency";
import WeekChart from "@/components/Result/WeekChart";
import { ScrollView, Text, View } from "react-native";

export default function ResultsScreen() {
  return (
    <View  style={{ paddingTop: 102 }}
    className="flex-1">
      <ScreenHeader 
        title="Kết quả"
      />
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
