import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ViewportScaler from '@/components/Common/ViewportScaler';
import { CourseProvider } from '@/contexts/CourseContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
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

  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <NavigationProvider>
          <CourseProvider>
            <ViewportScaler>
              <View style={{ flex: 1 }}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </View>
            </ViewportScaler>
          </CourseProvider>
        </NavigationProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}