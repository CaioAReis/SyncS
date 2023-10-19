import PagerView from "react-native-pager-view";
import { Avatar, IconButton } from "react-native-paper";
import { FlatList, View, useWindowDimensions } from "react-native";

import { useAppTheme } from "../../theme";
import { ExpCard, Text } from "../../components";

export default function Profile() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      <FlatList
        data={["", "", "", "", "", "", "", "", "", "", ""]}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 80 }} />}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10, marginHorizontal: 20 }}
        ListHeaderComponent={
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 4, marginHorizontal: 10 }}>
              <IconButton
                size={30}
                icon="share-outline"
                iconColor={colors.color1}
              />

              <IconButton
                size={30}
                icon="cog-outline"
                iconColor={colors.color1}
              />
            </View>

            <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
              <Avatar.Image
                size={130}
                source={{ uri: "https://api.dicebear.com/7.x/thumbs/svg?seed=Felix" }}
              />

              <Text fw="BOLD" ta="center" fs={25} style={{ marginVertical: 15, width: "100%" }}>
                Caio AReis
              </Text>
            </View>

            <View style={{ marginTop: 15, marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between" }}>
              <ExpCard
                expLevel={14}
                expType="EXP."
                size={width / 6}
                icon="ship-wheel"
                bgColor={colors.yellow11}
                circleColor={colors.yellow}
                iconColor={colors.background1}
              />

              <ExpCard
                expLevel={11}
                expType="PRO."
                size={width / 6}
                icon="sword-cross"
                bgColor={colors.blue11}
                circleColor={colors.blue}
                iconColor={colors.background1}
              />

              <ExpCard
                expLevel={3}
                icon="brain"
                expType="SAB."
                size={width / 6}
                bgColor={colors.green11}
                circleColor={colors.green}
                iconColor={colors.background1}
              />
            </View>

            <View style={{ marginTop: 25 }}>
              <Text fw="BOLD" fs={16} style={{ marginHorizontal: 20 }}>CONQUISTAS</Text>

              <PagerView>

              </PagerView>
            </View>

            <Text fw="BOLD" fs={16} style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 15 }}>SUA COLEÇÃO</Text>
          </>
        }

        renderItem={({ item }) => <View style={{ borderRadius: 10, width: width / 3.5, height: width / 3.5, backgroundColor: "red" }} />}
      />
    </View>
  );
}