import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, IconButton, List, Modal, Portal } from "react-native-paper";

import { Text } from "./Text";
import { router } from "expo-router";
import { useAppTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../services/AppContext";

export function LogoutButton() {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { setSession, setCollection, setAchievements } = useContext(AppContext);

  const onLogout = async () => {
    await AsyncStorage.clear().then(() => {
      setSession(null);
      setCollection([]);
      setAchievements([]);
      router.push("/signIn");
    });
  };

  return (
    <View>
      <List.Item
        title="Sair"
        rippleColor={colors.red11}
        onPress={() => setIsOpen(true)}
        titleStyle={{ color: colors.red }}
        left={props => <List.Icon {...props} color={colors.red} icon="logout" />}
        right={props => <List.Icon {...props} color={colors.red} icon="chevron-right" />}
      />

      <Portal>
        <Modal visible={isOpen} onDismiss={() => setIsOpen(false)}>

          <View style={{ padding: 15, width: "75%", borderRadius: 10, alignSelf: "center", backgroundColor: colors.background }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text fw="MEDIUM">Sair da conta?</Text>
              <IconButton icon="close" onPress={() => setIsOpen(false)} />
            </View>

            <Text fs={16} style={{ color: colors.color1 }}>
              Você realmente deseja sair da sua conta?
            </Text>

            <View style={{ alignItems: "flex-end", marginTop: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Button
                  mode="text"
                  textColor={colors.color1}
                  style={{ marginRight: 10 }}
                  onPress={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>

                <Button
                  mode="contained"
                  onPress={onLogout}
                  buttonColor={colors.red}
                >
                  Sair
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}