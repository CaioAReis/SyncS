import { Image, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";

import { Text } from "./Text";
import { useGallery } from "../hooks";
import { useAppTheme } from "../theme";
import { ImageGalleryProp, TimelinePeriod } from "../app/(tabs)/timeline";

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

interface RenderImagesProps {
  gallery: ImageGalleryProp[],
}

const RenderImages = ({ gallery }: RenderImagesProps) => {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { RenderGaley, startGallery } = useGallery();
  const images = gallery?.length > 5 ? [gallery[0], gallery[1], gallery[2], gallery[3]] : gallery;

  const sizeMiniImage = width / 7;

  return (
    <>
      {images?.length ? (
        <View style={styles.listView}>
          {images?.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => startGallery({ initialPage: i })}
              style={{
                width: sizeMiniImage,
                height: sizeMiniImage,
                backgroundColor: colors.color1,
                ...styles.miniImage,
              }}
            >
              <Image source={{ uri: item?.image }} style={{ width: "100%", height: "100%" }} />
            </Pressable>
          ))}

          {gallery?.length > 5 ? (
            <Pressable
              onPress={() => startGallery({ initialPage: 4 })}
              style={{
                width: width / 7,
                height: width / 7,
                backgroundColor: colors.color,
                ...styles.miniImage,
              }}
            >
              <Text color={colors.background}>
                +{gallery.length - images.length}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <RenderGaley gallery={gallery} />
    </>
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

          <RenderImages gallery={timelinePeriod.gallery!} />
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
  },

  listView: {
    marginTop: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  miniImage: {
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

});
