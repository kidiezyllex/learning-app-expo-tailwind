import ScreenHeader from "@/components/Common/ScreenHeader";
import { getScaleFactor } from "@/utils/scaling";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { icons } from "../../assets/icons/icons";
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
    <View  style={{ paddingTop: 25 }}
    className="flex-1">
      <ScreenHeader 
        title="Study Screen Sample"
        handleBackClick={() => router.back()}
        showRightIcons={true}
        firstRightIcon={icons.bell}
        firstRightIconWidth={getScaleFactor() * 51}
        firstRightIconHeight={getScaleFactor() * 51}
        secondRightIcon={icons.logout}
        secondRightIconWidth={getScaleFactor() * 39}
        secondRightIconHeight={getScaleFactor() * 41}
        handleFirstRightIconClick={() => {}}
        handleSecondRightIconClick={() => {}}
      />
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
