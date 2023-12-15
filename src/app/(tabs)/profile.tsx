// import PagerView from "react-native-pager-view";
import { useContext } from "react";
import { router } from "expo-router";
import { Avatar, IconButton } from "react-native-paper";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";

import { useGallery } from "../../hooks";
import { useAppTheme } from "../../theme";
import AppContext from "../../services/AppContext";
import { Achievement, CollectionItem, ExpCard, Text } from "../../components";

// const collection = [
//   { code: "001", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png" },
//   { code: "002", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/ivysaur.png" },
//   { code: "003", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/venusaur.png" },
//   { code: "004", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/charmander.png" },
//   { code: "005", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/charmeleon.png" },
//   { code: "006", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/charizard.png" },
//   { code: "007", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/squirtle.png" },
//   { code: "008", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/wartortle.png" },
//   { code: "009", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/blastoise.png" },
//   { code: "010", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/caterpie.png" },
//   { code: "011", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/metapod.png" },
//   { code: "012", name: "", image: "https://img.pokemondb.net/sprites/x-y/normal/butterfree.png" },
// ];

export default function Profile() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { RenderGaley, startGallery } = useGallery();
  const { session, achievements, checkLevel } = useContext(AppContext);  

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        numColumns={3}
        data={session?.collection}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnStyle}
        ListFooterComponent={<View style={{ height: 80 }} />}
        ListEmptyComponent={
          <View style={{ borderColor: colors.color10, alignItems: "center", borderStyle: "dashed", borderRadius: 10, borderWidth: 1, marginHorizontal: 20, paddingVertical: 100 }}>
            <Text fs={16} ta="center">{"Você ainda não possui \nFIGURAS em sua coleção"}</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <View style={[styles.headerView, { justifyContent: "flex-end" }]}>
              {/* <IconButton
                size={30}
                icon="share-outline"
                iconColor={colors.color1}
              /> */}

              <IconButton
                size={30}
                icon="cog-outline"
                iconColor={colors.color1}
                onPress={() => router.push("/stack/profileSettings")}
              />
            </View>

            <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
              <Avatar.Image
                size={130}
                source={{ uri: session?.picture }}
              />

              <Text fw="BOLD" ta="center" fs={25} style={{ marginVertical: 15, width: "100%" }}>
                {session?.name}
              </Text>
            </View>

            <View style={styles.levels}>
              <ExpCard
                expType="EXP."
                size={width / 6}
                icon="ship-wheel"
                bgColor={colors.yellow11}
                circleColor={colors.yellow}
                iconColor={colors.background}
                expLevel={checkLevel({ levelType: session?.experienceLevel ?? 0 })}
              />

              <ExpCard
                expType="PRO."
                size={width / 6}
                icon="sword-cross"
                bgColor={colors.blue11}
                circleColor={colors.blue}
                iconColor={colors.background}
                expLevel={checkLevel({ levelType: session?.professionalismLevel ?? 0 })}
              />

              <ExpCard
                icon="brain"
                expType="SAB."
                size={width / 6}
                bgColor={colors.green11}
                circleColor={colors.green}
                iconColor={colors.background}
                expLevel={checkLevel({ levelType: session?.wisdomLevel ?? 0 })}
              />
            </View>

            <View style={{ marginTop: 25 }}>
              <Text fw="BOLD" fs={16} style={{ marginHorizontal: 20 }}>CONQUISTAS</Text>

              {achievements?.length ? (
                <View style={styles.achievementList}>
                  {achievements.map(item => (
                    <Achievement size={width / 7} key={item?.id} achievement={item} />
                  ))}
                </View>
              ) : (
                <View style={{ borderColor: colors.color10, borderStyle: "dashed", borderRadius: 10, alignItems: "center", borderWidth: 1, marginTop: 15, marginHorizontal: 20, paddingVertical: 20 }}>
                  <Text fs={16} ta="center">Você ainda não possui conquistas</Text>
                </View>
              )}
            </View>

            <Text
              fw="BOLD" fs={16}
              style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 15 }}
            >
              SUA COLEÇÃO
            </Text>
          </>
        }

        renderItem={({ item, index }) => (
          <CollectionItem
            image={item.image}
            size={width / 3.4}
            onPress={() => startGallery({ initialPage: index })}
          />
        )}
      />

      <RenderGaley gallery={session?.collection} />
    </View>
  );
}

const styles = StyleSheet.create({

  headerView: {
    marginVertical: 4,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnStyle: {
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-around",
  },

  levels: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  achievementList: {
    marginTop: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
  },

});
