import { useState } from "react";
import PagerView from "react-native-pager-view";
import { IconButton, Modal, Portal } from "react-native-paper";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Image, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { TimelinePeriod } from "../app/(tabs)/timeline";

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

interface RenderImagesProps {
  galery: string[],
}

const RenderImages = ({ galery }: RenderImagesProps) => {
  const { colors } = useAppTheme();
  const { width, height } = useWindowDimensions();
  const [initialImage, setInitialImage] = useState(0);
  const [isOpenZoom, setIsOpenZoom] = useState(false);
  const images = galery?.length > 5 ? [galery[0], galery[1], galery[2], galery[3]] : galery;

  const sizeMiniImage = width / 7;

  return (
    <>
      {images?.length ? (
        <View style={styles.listView}>
          {images?.map((image, i) => (
            <Pressable
              key={i}
              onPress={() => {
                setInitialImage(i);
                setIsOpenZoom(true);
              }}

              style={{
                width: sizeMiniImage,
                height: sizeMiniImage,
                backgroundColor: colors.color1,
                ...styles.miniImage,
              }}
            >
              <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
            </Pressable>
          ))}

          {galery?.length > 5 ? (
            <Pressable
              onPress={() => {
                setInitialImage(4);
                setIsOpenZoom(true);
              }}

              style={{
                width: width / 7,
                height: width / 7,
                backgroundColor: colors.color,
                ...styles.miniImage,
              }}
            >
              <Text color={colors.background}>
                +{galery.length - images.length}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <Portal>
        <Modal dismissableBackButton visible={isOpenZoom} onDismiss={() => setIsOpenZoom(false)}>

          <PagerView initialPage={initialImage} style={{ width: width, height: height }}>
            {galery?.map((image, i) => (
              <ImageZoom
                key={i}
                src={image}
                style={{ width: width, height: height }}
              />
            ))}
          </PagerView>

          <IconButton
            size={30}
            icon="close"
            iconColor={colors.color}
            onPress={() => setIsOpenZoom(false)}
            style={{ position: "absolute", top: 20, right: 20, backgroundColor: colors.red12 }}
          />

        </Modal>
      </Portal>
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
