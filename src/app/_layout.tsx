import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Modal, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import { User } from "../types";
import { theme } from "../theme";
import AppContext from "../services/AppContext";

export default function App() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [session, setSession] = useState<User | null>(null);

  const [fontsLoaded, fontError] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const getSession = async () => {
    const user = await AsyncStorage.getItem("syncs_user")
      .then(result => {
        if (result) return JSON.parse(result);
      });
    setSession(user);
  };

  const getThemeSaved = async () => {
    const theme = await AsyncStorage.getItem("syncs_theme").then(result => result);
    setCurrentTheme(theme || colorScheme!);
  };

  useEffect(() => {
    getSession();
    getThemeSaved();
  }, []);

  if (!fontsLoaded && !fontError) return null;

  const appTheme = theme[currentTheme || colorScheme!];

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

          <PaperProvider theme={appTheme!}>

            <Slot />
            
            <Modal visible={isLoading} dismissable={false} onDismiss={() => setIsLoading(false)}>
              <ActivityIndicator size="large" color={appTheme?.colors?.primary} />
            </Modal>
          </PaperProvider>

          <StatusBar
            backgroundColor={appTheme?.colors?.background}
            style={(currentTheme || colorScheme!) === "dark" ? "light" : "dark"}
          />
        </SafeAreaView>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
