import { Redirect } from 'expo-router';

export default function StudyTab() {
  // Since this app uses custom navigation through the main index.tsx,
  // we redirect to the main tabs route where the custom navigation handles the study screen
  return <Redirect href="/(tabs)" />;
}
