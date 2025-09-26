import ScreenHeader from "@/components/Common/ScreenHeader";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
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
    <View  style={{ paddingTop: 102 }}
    className="flex-1">
      <ScreenHeader 
        title="Study Screen Sample"
        handleBackClick={() => router.back()}
        showRightIcons={true}
        firstRightIcon={require('../../assets/icons/bell.png')}
        firstRightIconWidth={51}
        firstRightIconHeight={51}
        secondRightIcon={require('../../assets/icons/logout.png')}
        secondRightIconWidth={39}
        secondRightIconHeight={41}
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
