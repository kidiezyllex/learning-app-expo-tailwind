import ErrorBoundary from '@/components/Common/ErrorBoundary';
import { Stack } from 'expo-router';
import '../global.css';
export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>  
    </ErrorBoundary>
  )
}