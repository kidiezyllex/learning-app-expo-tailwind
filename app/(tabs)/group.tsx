import "@/global.css";
import { View } from "react-native";

// Screen Components
import GroupScreen from "@/components/Screens/GroupScreen";

export default function GroupTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <GroupScreen />
    </View>
  );
}
