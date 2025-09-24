import VideoScreen from "@/components/Screens/VideoScreen";
import "@/global.css";
import { View } from "react-native";

export default function VideoIndex() {
  return (
    <View className="flex-1 bg-neutral-100">
      <VideoScreen />
    </View>
  );
}
