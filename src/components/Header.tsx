import { View } from "react-native";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { HeaderProps } from "../types";

export function Header({ title, goBack, color }: HeaderProps) {
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
        iconColor={color ?? colors.color}
        onPress={() => goBack ? goBack() : router.back()}
      />

      <Text
        fs={14}
        fw="SEMIB"
        ta="center"
        numberOfLines={2}
        style={{ flex: 1 }}
        color={color ?? colors.color}
      >
        {title?.toUpperCase()}
      </Text>

      <View style={{ width: 45 }} />
    </View>
  );
}