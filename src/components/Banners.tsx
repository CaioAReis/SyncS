import { useRef, useState } from "react";
import { useAppTheme } from "../theme";
import { TouchableRipple } from "react-native-paper";
import { Animated, Image, ScrollView, StyleSheet, View, ViewProps, useWindowDimensions } from "react-native";

interface Banner {
  thumb: string,
  action: () => void,
}

interface BannersProps {
  style?: ViewProps,
  banners: Banner[],
}

export function Banners({ banners, style }: BannersProps) {
  const { colors } = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [ currentBanner, setCurrentBanner ] = useState(0);

  return (
    <View style={{ ...style }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: 90, overflow: "hidden" }}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }], 
            { useNativeDriver: false }
          )
        }
        onMomentumScrollEnd={e => setCurrentBanner(
          Math.ceil(e.nativeEvent.contentOffset.x / windowWidth)
        )}
      >
        {banners.map((banner, i) => (
          <TouchableRipple
            key={i}
            onPress={banner.action}
            style={{ ...styles.bannerStyle, width: windowWidth - 40 }}
          >
            <Image source={{ uri: banner.thumb }} style={{ flex: 1, backgroundColor: "red" }} />
          </TouchableRipple>
        ))}
      </ScrollView>

      <View style={styles.dotsView}>
        {banners.map((image, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            extrapolate: "clamp",
            outputRange: [5, 15, 5],
          });

          return (
            <Animated.View
              key={index}
              style={{
                ...styles.dots,
                width,
                backgroundColor: currentBanner === index ? colors.primary : colors.background7,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  bannerStyle: {
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 20,
  },

  dotsView: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dots: {
    width: 5,
    height: 5,
    borderRadius: 80,
    marginHorizontal: 4,
  },

});
