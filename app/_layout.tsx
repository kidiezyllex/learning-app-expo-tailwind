import AbsoluteBottomNavigation from '@/components/Common/AbsoluteBottomNavigation';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ViewportScaler from '@/components/Common/ViewportScaler';
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { activeTab, setActiveTab } = useNavigation();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleNavigationTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <ViewportScaler>
      <View style={{ flex: 1 }}>
        <Slot />
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
    <NavigationContainer>
      <ErrorBoundary>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </ErrorBoundary>
    </NavigationContainer>
  );
}