import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../theme";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function App() {
  const colorScheme = useColorScheme();
  // const colorScheme = "dark";

  const appTheme = theme[colorScheme!];

  const [fontsLoaded, fontError] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: appTheme?.colors?.background }}>
        <PaperProvider theme={appTheme}>

          <Slot />

        </PaperProvider>

        <StatusBar
          backgroundColor={appTheme?.colors?.background}
          style={colorScheme === "dark" ? "light" : "dark"}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
