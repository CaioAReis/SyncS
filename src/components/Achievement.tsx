import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Button, IconButton, Modal, Portal } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { AchievementBase } from "../types";

export function Achievement({ achievement, size }: AchievementBase) {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable
        key={achievement?.id}
        onPress={() => setIsOpen(true)}
        style={{
          width: size || 60,
          height: size || 60,
          backgroundColor: colors.background5,
          ...styles.content,
        }}
      >
        <Image source={{ uri: achievement?.image?.replace("/upload/", "/upload/c_thumb,w_500,h_500/") }} style={{ flex: 1, borderRadius: 15 }} />

        {achievement.quantity && (
          achievement.quantity > 1 && (
            <View style={{ backgroundColor: colors.color, ...styles.quantityContent }}>
              <Text fs={12} fw="BOLD" style={{ color: colors.background }}>
                {achievement?.quantity}x
              </Text>
            </View>

          )
        )}
      </Pressable>

      <Portal>
        <Modal dismissableBackButton visible={isOpen} onDismiss={() => setIsOpen(false)}>

          <View style={{ padding: 15, width: "75%", borderRadius: 10, alignSelf: "center", backgroundColor: colors.background }}>

            <IconButton
              icon="close"
              onPress={() => setIsOpen(false)}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image
                  style={{ width: 200, height: 200, borderRadius: 15 }}
                  source={{ uri: achievement?.image }}
                />

                <Text fw="BOLD" fs={16} style={{ marginTop: 10 }}>{achievement?.name}</Text>

                {achievement.quantity && (
                  achievement.quantity > 1 && (
                    <View style={{
                      backgroundColor: colors.color,
                      ...styles.quantityContent,
                      bottom: 30, left: "30%",
                    }}
                    >
                      <Text fs={12} fw="BOLD" style={{ color: colors.background }}>
                        {achievement?.quantity}x
                      </Text>
                    </View>
                  )
                )}
              </View>

              <Text fs={14} style={{ textAlign: "center", color: colors.color1 }}>
                {achievement?.description}
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

const styles = StyleSheet.create({

  content: {
    margin: "2%",
    borderRadius: 15,
  },

  quantityContent: {
    bottom: -4,
    left: -6,
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 360,
  }

});