import { StyleSheet, View } from "react-native";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { TimelinePeriod } from "../app/(tabs)/timeline";

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

export function TimelineCard({ timelinePeriod, isLast }: TimelineCardProps) {
  const { colors } = useAppTheme();

  return (
    <>
      {!isLast && <View style={{ ...styles.line, backgroundColor: colors.color }} />}

      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              ...styles.circle,
              backgroundColor: colors.color,
              borderColor: colors.background,
            }}
          />
          <Text fs={14} color={colors.color1} style={{ marginHorizontal: 5 }}>
            {`${timelinePeriod?.when?.day || "--"} de ${timelinePeriod?.when?.month || "--"}`}
          </Text>
        </View>

        <View style={{ ...styles.content, backgroundColor: colors.background1 }}>
          <Text fs={16} lh={20} fw="BOLD" style={{ marginBottom: 6 }}>
            {timelinePeriod?.title}
          </Text>

          <Text color={colors.color1} fs={14} lh={18} ta="justify">
            {timelinePeriod?.body}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  line: {
    top: 2,
    width: 3,
    left: 28,
    height: "100%",
    borderRadius: 20,
    position: "absolute",
  },

  circle: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 10,
  },

  content: {
    padding: 10,
    marginLeft: 25,
    borderRadius: 10,
    marginVertical: 10,
  }

});
