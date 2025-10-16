import ErrorBoundary from '@/components/Common/ErrorBoundary';
import { CourseProvider } from '@/contexts/CourseContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ErrorBoundary>
          <NavigationProvider>
            <CourseProvider>
              {/* <ViewportScaler> */}
                <View style={{ flex: 1 }}>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  />
                </View>
              {/* </ViewportScaler> */}
            </CourseProvider>
          </NavigationProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}