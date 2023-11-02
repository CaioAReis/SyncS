import { useState } from "react";
import { Image, View } from "react-native";
import { IconButton, List, Modal, Portal } from "react-native-paper";

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

              <Text fs={14} style={{ color: colors.color1 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting.
              </Text>

            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
}