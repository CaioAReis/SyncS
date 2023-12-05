import { Avatar, TouchableRipple } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { TabButtonProps } from "../types";

export function TabButton({ focused, label, icon, color, bg }: TabButtonProps) {

  const { colors } = useAppTheme();

  return (
    <TouchableRipple
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 80,
        marginVertical: 3,
        borderColor: color,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: focused ? .7 : 0,
        backgroundColor: focused ? bg : "transparent",
      }}
    ><>
        <Avatar.Icon
          size={35}
          icon={icon}
          color={focused ? color : colors.color10}
          style={{ backgroundColor: "transparent" }}
        />

        <Text fw="BOLD" fs={14} style={{ color: color }}>
          {focused ? label : null}
        </Text>

      </></TouchableRipple>
  );
}