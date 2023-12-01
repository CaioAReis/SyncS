import { View } from "react-native";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { HeaderProps } from "../types";

export function Header({ title, goBack }: HeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{
      marginVertical: 10,
      paddingHorizontal: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}>

      <IconButton
        size={25}
        icon="arrow-left"
        style={{ margin: 0 }}
        iconColor={colors.color}
        onPress={() => goBack ? goBack() : router.back()}
      />

      <Text numberOfLines={2} ta="center" style={{ flex: 1 }} fw="SEMIB" fs={14}>
        {title?.toUpperCase()}
      </Text>

      <View style={{ width: 40 }} />
    </View>
  );
}