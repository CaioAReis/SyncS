import { useAppTheme } from "../theme";
import { Text } from "./Text";
import { Avatar, TouchableRipple } from "react-native-paper";

interface TabButtonProps {
  bg: string,
  icon: string,
  label: string,
  color: string,
  focused: boolean,
}

export function TabButton({ focused, label, icon, color, bg }: TabButtonProps) {

  const { colors } = useAppTheme();

  return (
    <TouchableRipple
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 80,
        marginVertical: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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