// import PagerView from "react-native-pager-view";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Avatar, IconButton } from "react-native-paper";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { query, collection as collectionFB, where, documentId, getDocs } from "firebase/firestore";

import { useGallery } from "../../hooks";
import { useAppTheme } from "../../theme";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";
import { Achievement, CollectionItem, ExpCard, Text } from "../../components";
import { AchievementProps, AnyObjectWithPropImage, FigureProps } from "../../types";

export default function Profile() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { RenderGaley, startGallery } = useGallery();
  const [achivementLoad, setAchivementLoad] = useState(false);
  const [collectionLoad, setCollectionLoad] = useState(false);
  const { session, achievements, setAchievements, collection, setCollection, checkLevel } = useContext(AppContext);

  const getAchievements = async () => {
    setAchivementLoad(true);
    const achievementRef = collectionFB(db, "achievements");
    const q = query(achievementRef, where(documentId(), "in", session!.achievements));
    const achievementList: Partial<AchievementProps>[] = await getDocs(q)
      .then(result => result.docs.map(item => ({ id: item.id, ...item.data() })))
      .catch(e => {
        console.error("Ocorreu um erro: " + e);
        return [];
      })
      .finally(() => setAchivementLoad(false));

    setAchievements(achievementList);
  };

  const getCollection = async () => {
    setCollectionLoad(true);
    const figuresRef = collectionFB(db, "figures");
    const q = query(figuresRef, where(documentId(), "in", session!.collection));
    const figuresList: Partial<FigureProps>[] = await getDocs(q)
      .then(result => result.docs.map(item => ({ id: item.id, ...item.data() })))
      .catch(e => {
        console.error("Ocorreu um erro: " + e);
        return [];
      })
      .finally(() => setCollectionLoad(false));

    setCollection(figuresList);
  };

  useEffect(() => {
    if (session!.achievements.length > 0 && achievements.length === 0) getAchievements();
    if (session!.collection.length > 0 && collection.length === 0) getCollection();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        numColumns={3}
        data={collection}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnStyle}
        ListFooterComponent={<View style={{ height: 80 }} />}
        ListEmptyComponent={
          collectionLoad
            ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
            : (
              <View style={{ borderColor: colors.color10, alignItems: "center", borderStyle: "dashed", borderRadius: 10, borderWidth: 1, marginHorizontal: 20, paddingVertical: 100 }}>
                <Text fs={16} ta="center">{"Você ainda não possui \nFIGURAS em sua coleção"}</Text>
              </View>
            )
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
                achivementLoad
                  ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
                  : (
                    <View style={{ borderColor: colors.color10, borderStyle: "dashed", borderRadius: 10, alignItems: "center", borderWidth: 1, marginTop: 15, marginHorizontal: 20, paddingVertical: 20 }}>
                      <Text fs={16} ta="center">Você ainda não possui conquistas</Text>
                    </View>
                  )
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
            size={width / 3.4}
            image={item.image!}
            onPress={() => startGallery({ initialPage: index })}
          />
        )}
      />

      <RenderGaley gallery={collection as Pick<AnyObjectWithPropImage, "image">[]} />
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
    marginHorizontal: 20,
  },

});
