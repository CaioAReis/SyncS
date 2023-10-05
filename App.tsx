import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Teste } from "./src/components/Teste";
import { theme } from "./src/theme";

export default function App() {
  const colorScheme = useColorScheme();
  const appTheme = theme[colorScheme!];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: appTheme?.colors?.background }}>
        <PaperProvider theme={appTheme}>

          <Teste />

        </PaperProvider>

        <StatusBar
          backgroundColor={appTheme?.colors?.background}
          style={colorScheme === "dark" ? "light" : "dark"}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
