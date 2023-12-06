import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { HomeButtonProps } from "../types";

export function HomeButton({ label, icon, description, color, height, horizontal = false }: HomeButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableRipple
      style={{ height: height, backgroundColor: color, ...styles.button }}
      onPress={() => router.push({
        pathname: "/stack/startQuestions",
        params: { label: label, icon: icon, color: color, description: description, id: "1" }
      })}
    >
      <>
        <View style={{ flexDirection: horizontal ? "row" : "column", ...styles.main }}>
          <Text
            fs={16}
            fw="BOLD"
            style={{ flex: horizontal ? 1 : 0, width: "100%", color: colors.background }}
          >
            {label}
          </Text>

          <Avatar.Icon
            size={80}
            icon={icon}
            color={colors.background}
            style={{ backgroundColor: "transparent", marginTop: horizontal ? 0 : height / 8 }}
          />
        </View>
      </>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({

  button: {
    marginBottom: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  main: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  }

});
