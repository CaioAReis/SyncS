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
import AppContext from "../services/AppContext";
import { useEffect, useState } from "react";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // const colorScheme = "dark";
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [session, setSession] = useState<User | null>(null);

  const appTheme = theme[colorScheme!];

  const [fontsLoaded, fontError] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    const getSession = async () => {
      // ESTUDAR CONTEXT PARA USER
      const user = await AsyncStorage.getItem("syncs_user")
        .then(result => {
          if (result) return JSON.parse(result);
        });
      setSession(user);
    };
    getSession();
  }, []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          session: session,
          setSession: setSession,

          isLoading: isLoading,
          setIsLoading: setIsLoading,

          theme: currentTheme,
          setTheme: setCurrentTheme,
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: appTheme?.colors?.background }}>

          <PaperProvider theme={appTheme}>

            <Slot />

          </PaperProvider>

          <StatusBar
            backgroundColor={appTheme?.colors?.background}
            style={colorScheme === "dark" ? "light" : "dark"}
          />
        </SafeAreaView>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
