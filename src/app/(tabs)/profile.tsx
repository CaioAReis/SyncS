// import PagerView from "react-native-pager-view";
import { Avatar, IconButton, Modal, Portal } from "react-native-paper";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";

import { useAppTheme } from "../../theme";
import { Achievement, CollectionItem, ExpCard, Text } from "../../components";
import { router } from "expo-router";
import { useState } from "react";
import PagerView from "react-native-pager-view";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

const collection = [
  "https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png",
  "https://img.pokemondb.net/sprites/x-y/normal/ivysaur.png",
  "https://img.pokemondb.net/sprites/x-y/normal/venusaur.png",
  "https://img.pokemondb.net/sprites/x-y/normal/charmander.png",
  "https://img.pokemondb.net/sprites/x-y/normal/charmeleon.png",
  "https://img.pokemondb.net/sprites/x-y/normal/charizard.png",
  "https://img.pokemondb.net/sprites/x-y/normal/squirtle.png",
  "https://img.pokemondb.net/sprites/x-y/normal/wartortle.png",
  "https://img.pokemondb.net/sprites/x-y/normal/blastoise.png",
  "https://img.pokemondb.net/sprites/x-y/normal/caterpie.png",
  "https://img.pokemondb.net/sprites/x-y/normal/metapod.png",
  "https://img.pokemondb.net/sprites/x-y/normal/butterfree.png",
];

const achievements = [
  { _id: "1", name: "A", description: "AA", image: "https://img.pokemondb.net/sprites/sword-shield/icon/vulpix.png", quantity: 1 },
  { _id: "2", name: "B", description: "BB", image: "https://img.pokemondb.net/sprites/sword-shield/icon/ninetales.png", quantity: 3 },
  { _id: "3", name: "C", description: "CC", image: "https://img.pokemondb.net/sprites/sword-shield/icon/zubat.png", quantity: 1 },
  { _id: "4", name: "D", description: "DD", image: "https://img.pokemondb.net/sprites/sword-shield/icon/golbat.png", quantity: 1 },
  { _id: "5", name: "E", description: "EE", image: "https://img.pokemondb.net/sprites/sword-shield/icon/oddish.png", quantity: 2 },
  { _id: "6", name: "F", description: "FF", image: "https://img.pokemondb.net/sprites/sword-shield/icon/gloom.png", quantity: 1 },
  { _id: "7", name: "G", description: "GG", image: "https://img.pokemondb.net/sprites/sword-shield/icon/vileplume.png", quantity: 4 },
  { _id: "8", name: "H", description: "HH", image: "https://img.pokemondb.net/sprites/sword-shield/icon/abra.png", quantity: 1 },

  { _id: "9", name: "J", description: "JJ", image: "https://img.pokemondb.net/sprites/sword-shield/icon/kadabra.png", quantity: 1 },
  { _id: "10", name: "K", description: "KK", image: "https://img.pokemondb.net/sprites/sword-shield/icon/alakazam.png", quantity: 1 },
  { _id: "11", name: "L", description: "LL", image: "https://img.pokemondb.net/sprites/sword-shield/icon/tentacruel.png", quantity: 1 },
];

export default function Profile() {
  const { colors } = useAppTheme();
  const { width, height } = useWindowDimensions();

  const [startZoom, setStartZoom] = useState(0);
  const [isOpenZoom, setIsOpenZoom] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        numColumns={3}
        data={collection}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnStyle}
        ListFooterComponent={<View style={{ height: 80 }} />}
        ListHeaderComponent={
          <>
            <View style={styles.headerView}>
              <IconButton
                size={30}
                icon="share-outline"
                iconColor={colors.color1}
              />

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
                source={{ uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=Aneka" }}
              />

              <Text fw="BOLD" ta="center" fs={25} style={{ marginVertical: 15, width: "100%" }}>
                Caio AReis
              </Text>
            </View>

            <View style={styles.levels}>
              <ExpCard
                expLevel={14}
                expType="EXP."
                size={width / 6}
                icon="ship-wheel"
                bgColor={colors.yellow11}
                circleColor={colors.yellow}
                iconColor={colors.background}
              />

              <ExpCard
                expLevel={11}
                expType="PRO."
                size={width / 6}
                icon="sword-cross"
                bgColor={colors.blue11}
                circleColor={colors.blue}
                iconColor={colors.background}
              />

              <ExpCard
                expLevel={3}
                icon="brain"
                expType="SAB."
                size={width / 6}
                bgColor={colors.green11}
                circleColor={colors.green}
                iconColor={colors.background}
              />
            </View>

            <View style={{ marginTop: 25 }}>
              <Text fw="BOLD" fs={16} style={{ marginHorizontal: 20 }}>CONQUISTAS</Text>

              <View style={styles.achievementList}>
                {achievements.map(item => (
                  <Achievement key={item?._id} achievement={item} />
                ))}
              </View>
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
            image={item}
            size={width / 3.4}
            action={() => {
              setStartZoom(index);
              setIsOpenZoom(true);
            }}
          />
        )}
      />

      <Portal>
        <Modal visible={isOpenZoom}>

          <PagerView initialPage={startZoom} style={{ width: width, height: height }}>
            {collection?.map((image, i) => (
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
