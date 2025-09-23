import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ViewportScaler from '@/components/Common/ViewportScaler';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return (
    <ErrorBoundary>
      <NavigationProvider>
        <ViewportScaler>
          <View style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </View>
        </ViewportScaler>
      </NavigationProvider>
    </ErrorBoundary>
  );
}