import { useCallback, useState } from "react";
import PagerView from "react-native-pager-view";
import { Modal, Portal } from "react-native-paper";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Pressable, View, useWindowDimensions } from "react-native";
import { RenderGalleryProps } from "../types";

export function useGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  const [initialPage, setInitialPage] = useState(0);
  // const [gallery, setGallery] = useState<Pick<AnyObjectWithPropImage, "image">[]>([]);

  const startGallery = ({ initialPage }: Pick<RenderGalleryProps, "initialPage">) => {
    setInitialPage(initialPage ?? 0);
    setIsOpen(true);
  };

  const onDismiss = useCallback(() => {
    setInitialPage(0);
    setIsOpen(false);
  }, []);

  const RenderGaley = ({ gallery }: Pick<RenderGalleryProps, "gallery">) => (
    <Portal>
      <Modal dismissableBackButton visible={isOpen} onDismiss={onDismiss}>

        <PagerView initialPage={initialPage} style={{ width: width, height: height }}>
          {gallery?.map((item, i) => (
            <View key={i} style={{ alignItems: "center", justifyContent: "center" }}>

              <Pressable
                onPress={onDismiss}
                style={{ width: width, height: height }}
              />

              <ImageZoom
                src={item.image}
                style={{ position: "absolute", width: width, height: width }}
              />
            </View>
          ))}
        </PagerView>

      </Modal>
    </Portal >
  );

  return { RenderGaley, startGallery };
}