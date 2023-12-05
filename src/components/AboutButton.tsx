import { useState } from "react";
import { Image, View } from "react-native";
import { Button, IconButton, List, Modal, Portal } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";

export function AboutButton() {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <List.Item
        title="Sobre"
        style={{ marginBottom: 10 }}
        rippleColor={colors.purple11}
        onPress={() => setIsOpen(true)}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        left={props => <List.Icon {...props} icon="information-outline" />}
      />

      <Portal>
        <Modal visible={isOpen} onDismiss={() => setIsOpen(false)}>

          <View style={{ padding: 15, width: "75%", borderRadius: 10, alignSelf: "center", backgroundColor: colors.background }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text fw="MEDIUM">SyncSphere</Text>
              <IconButton icon="close" onPress={() => setIsOpen(false)} />
            </View>

            <View>

              <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require("../../assets/images/Logo.png")}
                />

                <Text fs={12} style={{ marginTop: 10 }}>Versão: {"1.0.0"}</Text>
              </View>

              <Text fs={14} style={{ textAlign: "justify", color: colors.color1 }}>
                SyncSphere é uma plataforma gamificada com o objetivo de estreitar o 
                relacionamento entre a instituição e seus egressos do Instituto 
                Federal de Sergipe, permitindo que suas vivências contribuam 
                para o aprimoramento contínuo do currículo acadêmico do instituto.
              </Text>

              <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-end" }}>
                <Button
                  mode="text"
                  textColor={colors.color1}
                  style={{ marginRight: 10 }}
                  onPress={() => setIsOpen(false)}
                >
                  Fechar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
}