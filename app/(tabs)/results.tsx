import "@/global.css";
import { View } from "react-native";

// Screen Components
import ResultsScreen from "@/components/Screens/ResultsScreen";

export default function ResultsTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <ResultsScreen />
    </View>
  );
}
