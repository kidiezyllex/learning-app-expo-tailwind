import "@/global.css";
import React, { useState } from "react";
import { View } from "react-native";

// Components
import BottomNavigation from "@/components/Common/BottomNavigation";

// Screen Components
import GroupScreen from "@/components/Screens/GroupScreen";
import HomeScreen from "@/components/Screens/HomeScreen";
import ProfileScreen from "@/components/Screens/ProfileScreen";
import ResultsScreen from "@/components/Screens/ResultsScreen";
import StudyScreen from "@/components/Screens/StudyScreen";

export default function MainScreen() {
  const [activeNavigationTab, setActiveNavigationTab] = useState("home");

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleNavigationTabPress = (tabId: string) => {
    console.log("Navigation tab pressed:", tabId);
    setActiveNavigationTab(tabId);
  };

  const renderActiveScreen = () => {
    switch (activeNavigationTab) {
      case "home":
        return <HomeScreen onNotificationPress={handleNotificationPress} />;
      case "group":
        return <GroupScreen onNotificationPress={handleNotificationPress} />;
      case "study":
        return <StudyScreen onNotificationPress={handleNotificationPress} />;
      case "results":
        return <ResultsScreen onNotificationPress={handleNotificationPress} />;
      case "profile":
        return <ProfileScreen onNotificationPress={handleNotificationPress} />;
      default:
        return <HomeScreen onNotificationPress={handleNotificationPress} />;
    }
  };

  return (
    <View className="flex-1 mb-10 bg-neutral-100">
      {/* Active Screen Content */}
      {renderActiveScreen()}

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeNavigationTab}
        onTabPress={handleNavigationTabPress}
      />
    </View>
  );
}
