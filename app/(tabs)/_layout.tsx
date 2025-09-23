import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 124,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#646464',
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('../../assets/icons/home.png')} 
              style={{ width: 59, height: 59, tintColor: color }} 
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
              source={require('../../assets/icons/archive-book.png')} 
              style={{ width: 58, height: 58, tintColor: color }} 
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
              source={require('../../assets/icons/book-saved.png')} 
              style={{ width: 65, height: 65, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Result',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('../../assets/icons/chart.png')} 
              style={{ width: 54, height: 54, tintColor: color }} 
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
              source={require('../../assets/icons/user.png')} 
              style={{ width: 49, height: 49, tintColor: color }} 
            />
          ),
        }}
      />
    </Tabs>
  );
}