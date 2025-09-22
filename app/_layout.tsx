import AbsoluteBottomNavigation from '@/components/Common/AbsoluteBottomNavigation';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ViewportScaler from '@/components/Common/ViewportScaler';
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import '../global.css';

function AppContent() {
  const { activeTab, setActiveTab } = useNavigation();

  const handleNavigationTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <ViewportScaler>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
        </Stack>

        <AbsoluteBottomNavigation
          activeTab={activeTab}
          onTabPress={handleNavigationTabPress}
        />
      </View>
    </ViewportScaler>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErrorBoundary>
  );
}