import { Stack } from 'expo-router';
import { MissionProvider } from '../src/contexts/MissionContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </MissionProvider>
  );
}
