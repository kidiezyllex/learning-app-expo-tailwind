import { icons } from '@/assets/icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={icons.home} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: 'Group',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={icons.archiveBook} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: 'Study',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={icons.bookSaved} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={icons.chart} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={icons.user} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
    </Tabs>
  );
}