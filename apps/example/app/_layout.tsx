import Tst from '@tastien/react-native-component';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Tst.Provider>
      <Stack
        screenOptions={{
          title: '',
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='DemoBlank' />
        <Stack.Screen name='DemoButton' />
        <Stack.Screen name='DemoCell' />
        <Stack.Screen name='DemoPasswordInput' />
        <Stack.Screen name='DemoPopup' />
        <Stack.Screen name='DemoSpace' />
        <Stack.Screen name='DemoToast' />
        <Stack.Screen name='DemoDropdown' />
      </Stack>
    </Tst.Provider>
  );
}
