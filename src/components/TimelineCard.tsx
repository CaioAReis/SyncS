import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { TimelinePeriod } from "../app/(tabs)/timeline";

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

interface RenderImagesProps {
  galery: string[]
}

const RenderImages = ({ galery }: RenderImagesProps) => {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const images = galery?.length > 5 ? [galery[0], galery[1], galery[2], galery[3]] : galery;

  return (
    images?.length ? (
      <View style={{ marginTop: 8, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around" }}>
        {images?.map((image, i) => (
          <Image
            key={i}
            source={{ uri: image }}
            style={{
              borderRadius: 8,
              width: width / 7,
              height: width / 7,
              backgroundColor: colors.color1,
            }}
          />
        ))}

        {galery?.length > 5 ? (
          <View style={{ alignItems: "center", justifyContent: "center", borderRadius: 8, width: width / 7, height: width / 7, backgroundColor: colors.color, }}>
            <Text color={colors.background}>+{galery.length - images.length}</Text>
          </View>
        ) : null}
      </View>
    ) : null
  );
};

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

          <Text color={colors.color6} fs={14} lh={18} ta="justify">
            {timelinePeriod?.body}
          </Text>

          <RenderImages galery={timelinePeriod.galery!} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  line: {
    top: 2,
    width: 3,
    left: 30,
    height: "100%",
    borderRadius: 20,
    position: "absolute",
  },

  circle: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderRadius: 15,
  },

  content: {
    padding: 10,
    marginLeft: 25,
    borderRadius: 10,
    marginVertical: 10,
  }

});
