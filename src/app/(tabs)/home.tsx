import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { useAppTheme } from "../../theme";
import { Banners, Text } from "../../components";

export default function Home() {
  const { colors } = useAppTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={{ flexDirection: "row", margin: 20, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text fw="MEDIUM" fs={22}>Olá, Caio</Text>
          <Text fs={14} style={{ color: colors.color1, flex: 1, lineHeight: 20, marginTop: 10 }}>
            {"Responda as perguntas \ndas categorias abaixo!"}
          </Text>
        </View>

        <Avatar.Image size={70} source={{ uri: "https://api.dicebear.com/7.x/thumbs/svg?seed=Felix" }} />
      </View>

      <Banners
        banners={[
          { thumb: "", action: () => { } },
          { thumb: "", action: () => { } },
          { thumb: "", action: () => { } },
        ]}
      />

    </ScrollView>
  );
}