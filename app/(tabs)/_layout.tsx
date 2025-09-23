import { Tabs } from 'expo-router';
import { View } from 'react-native';
import CustomTabBar from '../../components/Common/CustomTabBar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide default tab bar
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="group" />
        <Tabs.Screen name="study" />
        <Tabs.Screen name="results" />
        <Tabs.Screen name="profile" />
      </Tabs>
      <CustomTabBar />
    </View>
  );
}