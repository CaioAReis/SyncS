import { useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton, List, Modal, Portal } from "react-native-paper";

import { Text } from "./Text";
import { router } from "expo-router";
import { useAppTheme } from "../theme";
import { auth } from "../services/firebaseConfig";

export function DeleteAccountButton() {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteAccount = () => {
    auth.currentUser?.delete().then(() => {
      AsyncStorage.clear().then(() => router.push("/signIn"));
    });
  };

  return (
    <>
      <List.Item
        title="Apagar conta"
        rippleColor={colors.red11}
        onPress={() => setIsOpen(true)}
        titleStyle={{ color: colors.red }}
        right={props => <List.Icon {...props} color={colors.red} icon="chevron-right" />}
        left={props => <List.Icon {...props} color={colors.red} icon="trash-can-outline" />}
      />

      <Portal>
        <Modal visible={isOpen} onDismiss={() => setIsOpen(false)}>

          <View style={{ padding: 15, width: "75%", borderRadius: 10, alignSelf: "center", backgroundColor: colors.background }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text fw="MEDIUM">Apagar conta?</Text>
              <IconButton icon="close" onPress={() => setIsOpen(false)} />
            </View>

            <Text fs={16} style={{ color: colors.color1 }}>
              Você realmente deseja apagar sua conta?
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
                  buttonColor={colors.red}
                  onPress={onDeleteAccount}
                >
                  APAGAR
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
}