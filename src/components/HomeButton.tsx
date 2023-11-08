import { View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";

interface HomeButtonProps {
  icon: string,
  color: string,
  label: string,
  height: number,
  horizontal?: boolean,
}

export function HomeButton({ label, icon, color, height, horizontal = false }: HomeButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableRipple style={{ marginBottom: 16, backgroundColor: color, borderRadius: 20, height: height, alignItems: "center", justifyContent: "flex-start" }}><>
      <View style={{ flexDirection: horizontal ? "row" : "column", width: "100%", padding: 15, alignItems: "center", justifyContent: "space-between" }}>
        <Text fw="BOLD" fs={16} style={{ flex: horizontal ? 1 : 0, width: "100%", color: colors.background }}>
          {label}
        </Text>

        <Avatar.Icon
          size={80}
          icon={icon}
          color={colors.background}
          style={{ backgroundColor: "transparent", marginTop: horizontal ? 0 : height / 8 }}
        />
      </View>
    </></TouchableRipple>
  );
}
