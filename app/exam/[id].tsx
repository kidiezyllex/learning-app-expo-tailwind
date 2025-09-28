import "@/global.css";
import { View } from "react-native";

import HistoryExamHeader from "@/components/HistoryExam/HistoryExamHeader";
import HistoryExamScreen from "@/components/Screens/HistoryExamScreen";

export default function ExamTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <HistoryExamHeader />
      <HistoryExamScreen />
    </View>
  );
}
