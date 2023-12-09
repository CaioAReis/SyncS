import { Slot } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, View, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button, Modal, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import { theme } from "../theme";
import { Text } from "../components";
import { Earnings, User } from "../types";
import AppContext from "../services/AppContext";

export default function App() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [session, setSession] = useState<User | null>(null);
  const [earnings, setEarnings] = useState<Earnings | null>(null);

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

  const checkLevel = useCallback(({ levelType }: { levelType: number }) => {

    const levelsBase = [
      levelType > 0,
      levelType < 50,
      levelType < 120,
      levelType < 200,
      levelType < 300,
      levelType < 420,
      levelType < 560,
      levelType < 720,
      levelType < 900,
      levelType < 1100,
      levelType < 1320,
      levelType < 1560,
      levelType < 1820,
      levelType < 2100,
      levelType < 2400,
      levelType < 2720,
      levelType < 3060,
      levelType < 3420,
      levelType < 3800,
      levelType < 4200,
      levelType < 4620,
      levelType < 5660,
      levelType < 5520,
      levelType < 6000,
      levelType < 6500,
      levelType < 7020,
      levelType < 7560,
      levelType < 8120,
      levelType < 8700,
      levelType < 9300,
    ];

    const currentLevel = levelsBase.filter(i => !i).length;

    return currentLevel;
  }, []);

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

          setEarnings: setEarnings,

          checkLevel: checkLevel,
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: appTheme?.colors?.background }}>

          <PaperProvider theme={appTheme!}>

            <Slot />

            <Modal visible={isLoading} dismissable={false} onDismiss={() => setIsLoading(false)}>
              <ActivityIndicator size="large" color={appTheme?.colors?.primary} />
            </Modal>

            <Modal visible={Boolean(earnings)} onDismiss={() => setEarnings(null)}>
              <View style={{ paddingVertical: 14, borderRadius: 8, alignSelf: "center", width: "85%", backgroundColor: "white" }}>
                <Text ta="center" fw="BOLD">Parabéns!</Text>

                <View>
                  <Text ta="center" fs={18} style={{ marginTop: 2, marginBottom: 25 }}>
                    {earnings?.type === "ACHIEVEMENT" && "Nova conquista desbloqueada!"}
                    {earnings?.type === "FIGURE" && "Uma nova figura foi desbloqueada!"}
                  </Text>

                  <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
                    <Text fw="BOLD" ta="center" fs={14}>{earnings?.title}</Text>
                    <Image
                      source={{ uri: earnings?.image }}
                      style={{ marginVertical: 10, borderRadius: 10, width: 90, height: 90 }}
                    />
                  </View>
                </View>

                <Button
                  mode="text"
                  onPress={() => setEarnings(null)}
                  style={{ alignSelf: "flex-end", marginHorizontal: 20 }}
                >
                  Continuar
                </Button>
              </View>
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
