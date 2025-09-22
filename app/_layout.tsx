import AbsoluteBottomNavigation from '@/components/Common/AbsoluteBottomNavigation';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ViewportScaler from '@/components/Common/ViewportScaler';
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext';
import { Stack } from 'expo-router';
import '../global.css';

function AppContent() {
  const { activeTab, setActiveTab } = useNavigation();

  const handleNavigationTabPress = (tabId: string) => {
    console.log("Navigation tab pressed:", tabId);
    setActiveTab(tabId);
  };

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleAvatarPress = () => {
    console.log("Avatar pressed");
  };

  return (
    <>
      <ViewportScaler>
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
      </ViewportScaler>

      {/* Bottom Navigation - nằm ngoài ViewportScaler để không bị scale */}
      <AbsoluteBottomNavigation
        activeTab={activeTab}
        onTabPress={handleNavigationTabPress}
      />
    </>
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