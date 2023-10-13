import { Text } from "./Text";
import { View } from "react-native";
import { useAppTheme } from "../theme";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

export function Header() {
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
        size={30}
        icon="arrow-left"
        style={{ margin: 0 }}
        iconColor={colors.color}
        onPress={() => router.back()}
      />

      <Text numberOfLines={2} ta="center" style={{ flex: 1 }} fw="SEMIB" fs={14}>RECUPERAR SENHA</Text>

      <View style={{ width: 40 }} />
    </View>
  );
}