import { Image, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";

import { Text } from "./Text";
import { useAppTheme } from "../theme";
import { TimelinePeriod } from "../app/(tabs)/timeline";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import PagerView from "react-native-pager-view";

interface TimelineCardProps {
  isLast?: boolean,
  timelinePeriod: TimelinePeriod,
}

interface RenderImagesProps {
  galery: string[],
  setIsOpenZoom: (value: boolean) => void,
}

const RenderImages = ({ galery, setIsOpenZoom }: RenderImagesProps) => {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const images = galery?.length > 5 ? [galery[0], galery[1], galery[2], galery[3]] : galery;

  return (
    images?.length ? (
      <View style={{ marginTop: 8, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around" }}>
        {images?.map((image, i) => (
          <Pressable
            key={i}
            onPress={() => setIsOpenZoom(true)}
            style={{
              borderRadius: 8,
              width: width / 7,
              height: width / 7,
              overflow: "hidden",
              backgroundColor: colors.color1,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          </Pressable>
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
  const [isOpenZoom, setIsOpenZoom] = useState(false);
  const { width, height } = useWindowDimensions();

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

          <RenderImages setIsOpenZoom={setIsOpenZoom} galery={timelinePeriod.galery!} />
        </View>
      </View>

      <Portal>
        <Modal visible={isOpenZoom}>

          <PagerView style={{ width: width, height: height, alignItems: "center", justifyContent: "center" }}>

            <ImageZoom
              style={{ width: width, height: width }}
              src="https://humulos.com/digimon/images/art/tao.jpg"
            />

            <ImageZoom
              style={{ width: width, height: width }}
              src="https://humulos.com/digimon/images/art/tao.jpg"
            />

          </PagerView>

        </Modal>
      </Portal>
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
