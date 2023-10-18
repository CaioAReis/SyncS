import { Avatar, TouchableRipple } from "react-native-paper";

import { Text } from "./Text";
import { useAppTheme } from "../theme";

interface HomeButtonProps {
  color: string,
  height: number,
}

export function HomeButton({ color, height }: HomeButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableRipple style={{ marginBottom: 16, backgroundColor: color, borderRadius: 20, height: height, alignItems: "center", justifyContent: "center" }}><>
      <Avatar.Icon
        size={80}
        icon="camera"
        style={{ backgroundColor: "transparent" }}
      />

      <Text fw="BOLD" fs={18} style={{ color: colors.background1, position: "absolute", top: 20, width: "80%" }}>Carreira</Text>
    </></TouchableRipple>
  );
}
