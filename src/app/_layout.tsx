import { Stack } from "expo-router";

import { AuthProvider } from "@context/AuthContext";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="credits/index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </KeyboardProvider>
  );
}
