import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: '返回',
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='DemoBlank' />
      <Stack.Screen name='DemoButton' />
      <Stack.Screen name='DemoCell' />
    </Stack>
  );
}
