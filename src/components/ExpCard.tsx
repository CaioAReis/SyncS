import { View } from "react-native";
import { Avatar } from "react-native-paper";

import { Text } from "./Text";
import { ExpCardProps } from "../types";

export function ExpCard({ icon, iconColor, size, bgColor, circleColor, expLevel, expType }: ExpCardProps) {

  return (
    <View style={{ backgroundColor: bgColor, borderRadius: 360, }}>
      <View style={{ backgroundColor: circleColor, padding: 18, borderRadius: 360 }}>
        <Avatar.Icon
          size={size || 50}
          color={iconColor}
          icon={icon || "close"}
          style={{ backgroundColor: "transparent" }}
        />
      </View>

      <View style={{ alignItems: "center", marginBottom: 15 }}>
        <Text fw="BOLD" fs={25}>{expLevel.toString()}</Text>
        <Text fw="BOLD" fs={12} lh={14}>{expType}</Text>
      </View>
    </View>
  );
}