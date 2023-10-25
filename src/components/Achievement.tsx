import { Image, StyleSheet, View } from "react-native";

import { Text } from "./Text";
import { useAppTheme } from "../theme";

interface AchievementBase {
  _id: string,
  image: string,
  quantity: number,
}

interface AchievementProps {
  size?: number,
  achievement: AchievementBase,
}

export function Achievement({ achievement, size }: AchievementProps) {
  const { colors } = useAppTheme();

  return (
    <View
      key={achievement?._id}
      style={{
        width: size || 60,
        height: size || 60,
        backgroundColor: colors.background5,
        ...styles.content,
      }}
    >
      <Image source={{ uri: achievement?.image }} style={{ flex: 1 }} />

      {achievement.quantity > 1 && (
        <View style={{ backgroundColor: colors.color, ...styles.quantityContent }}>
          <Text fs={12} fw="BOLD" style={{ color: colors.background }}>
            {achievement?.quantity}x
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  content: {
    margin: 6,
    borderRadius: 20,
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