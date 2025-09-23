import ProfileScreen from "@/components/Screens/ProfileScreen";
import "@/global.css";
import { View } from "react-native";
export default function ProfileTab() {
  return (
    <View className="flex-1 bg-neutral-100">
      <ProfileScreen />
    </View>
  );
}
