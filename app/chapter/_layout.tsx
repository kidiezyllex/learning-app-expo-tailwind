import { Stack } from 'expo-router';

export default function ChapterLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
