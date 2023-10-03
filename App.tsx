import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

import { dark } from "./src/theme/dark";
import { light } from "./src/theme/light";
import { Teste } from "./src/components/Teste";

export default function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark"
    ? { ...MD3DarkTheme, colors: { ...dark } }
    : { ...MD3LightTheme, colors: { ...light } };

  const background = {
    dark: dark.background,
    light: light.background,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: background[colorScheme!] }}>
        <PaperProvider theme={theme}>

          <Teste />

        </PaperProvider>

        <StatusBar
          backgroundColor={background[colorScheme!]}
          style={colorScheme === "dark" ? "light" : "dark"}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
