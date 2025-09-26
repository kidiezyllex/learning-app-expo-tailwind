import { Tabs } from 'expo-router';
import { View } from 'react-native';
import TabBarWrapper from '../../components/Common/TabBarWrapper';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, 
        }}
        tabBar={() => null} // Explicitly disable the default tab bar
      >
        <Tabs.Screen 
          name="index" 
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen 
          name="group" 
          options={{
            title: 'Group',
          }}
        />
        <Tabs.Screen 
          name="study" 
          options={{
            title: 'Study',
          }}
        />
        <Tabs.Screen 
          name="results" 
          options={{
            title: 'Results',
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
      <TabBarWrapper />
    </View>
  );
}