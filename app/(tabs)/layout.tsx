import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
        <Tabs.Screen
        name='index'
        options={{
            headerShown:false,
            title:"Home"
        }}
        />
        <Tabs.Screen
        name='search'
        options={{
            headerShown:false,
            title:"Search"
        }}
        />
        <Tabs.Screen
        name='saved'
        options={{
            headerShown:false,
            title:"Saved"
        }}
        />
        <Tabs.Screen
        name='profile'
        options={{
            headerShown:false,
            title:"Profile"
        }}
        />
    </Tabs>
  )
}