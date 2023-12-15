// import PagerView from "react-native-pager-view";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import { Avatar, IconButton } from "react-native-paper";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";

import { useGallery } from "../../hooks";
import { useAppTheme } from "../../theme";
import AppContext from "../../services/AppContext";
import { Achievement, CollectionItem, ExpCard, Text } from "../../components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { User } from "../../types";

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

// const achievements = [
//   { _id: "1", name: "Conquista A", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/vulpix.png", quantity: 1 },
//   { _id: "2", name: "Conquista B", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/ninetales.png", quantity: 3 },
//   { _id: "3", name: "Conquista C", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/zubat.png", quantity: 1 },
//   { _id: "4", name: "Conquista D", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/golbat.png", quantity: 1 },
//   { _id: "5", name: "Conquista E", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/oddish.png", quantity: 2 },
//   { _id: "6", name: "Conquista F", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/gloom.png", quantity: 1 },
//   { _id: "7", name: "Conquista G", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/vileplume.png", quantity: 4 },
//   { _id: "8", name: "Conquista H", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/abra.png", quantity: 1 },

//   { _id: "9", name: "Conquista J", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/kadabra.png", quantity: 1 },
//   { _id: "10", name: "Conquista K", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/alakazam.png", quantity: 1 },
//   { _id: "11", name: "Conquista L", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", image: "https://img.pokemondb.net/sprites/sword-shield/icon/tentacruel.png", quantity: 1 },
// ];

export default function Profile() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { RenderGaley, startGallery } = useGallery();
  const { session, setSession, checkLevel } = useContext(AppContext);

  // console.warn(session);

  useEffect(() => {
    async function getAc() {
      await getDocs(collection(db, `users/${session?.id}/achievements`))
        .then(r => {
          console.warn("buscou");
          setSession({
            ...session, achievements: r.docs.map(doc => {
              return { id: doc.id, ...doc.data() };
            })
          } as User);
        });
    }

    getAc();

  }, []);


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

              {session?.achievements?.length ? (
                <View style={styles.achievementList}>
                  {session?.achievements.map(item => (
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
