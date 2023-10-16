import { View, ViewProps } from "react-native";
import PagerView from "react-native-pager-view";

interface Banner {
  thumb: string,
  action: () => void,
}

interface BannersProps {
  style?: ViewProps,
  banners: Banner[],
}


export function Banners({ banners, style }: BannersProps) {

  return (
    <View style={{ ...style }}>
      <PagerView style={{ height: 80, overflow: "hidden" }}>
        {banners.map((banner, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: "blue", borderRadius: 10, marginHorizontal: 20 }} />
        ))}
      </PagerView>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
        <View style={{ height: 10, width: 10, backgroundColor: "red", borderRadius: 80, marginHorizontal: 4 }} />
        <View style={{ height: 10, width: 20, backgroundColor: "red", borderRadius: 80, marginHorizontal: 4 }} />
        <View style={{ height: 10, width: 10, backgroundColor: "red", borderRadius: 80, marginHorizontal: 4 }} />
      </View>
    </View>
  );
}