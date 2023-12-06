import { Redirect, router } from "expo-router";
import PagerView from "react-native-pager-view";
import { Button, IconButton } from "react-native-paper";
import { useContext, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

import { Text } from "../components";
import { useAppTheme } from "../theme";
import AppContext from "../services/AppContext";

export default function WelcomePage() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const pagesRef = useRef<PagerView>(null);
  const { session } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const imageSize = width / 1.5;

  const pages = [
    {
      image: require("../../assets/images/ConnectedWorld.png"),
      text: "Participe da nossa comunidade \ne compartilhe suas experiências!"
    },

    {
      image: require("../../assets/images/Request.png"),
      text: "Contribua para a formação acadêmica de \nfuturos profissionais e inspire novas \ntrajetórias de sucesso",
    },

    {
      image: require("../../assets/images/AcceptRequest.png"),
      text: "Torne-se uma fonte de motivação para a \npróxima geração de profissionais.",
    },

    {
      image: require("../../assets/images/PressPlay.png"),
      text: "Cadastre-se ou Entre e deixe sua marca \npara o aprimoramento acadêmico!",
    },
  ];

  useEffect(() => {
    pagesRef?.current?.setPage(currentPage);
  }, [currentPage]);

  if (session) return <Redirect href={"/home"} />;

  return (
    <View style={{ flex: 1 }}>
      <PagerView scrollEnabled={false} ref={pagesRef} style={{ flex: 1 }} initialPage={0}>
        {pages?.map((page, i) => (
          <View style={{ flex: 1, alignItems: "center" }} key={i}>
            <Image
              source={page?.image}
              style={{
                marginTop: "20%",
                width: imageSize,
                height: imageSize,
                marginBottom: "10%",
              }}
            />

            <Text fs={16} fw="SEMIB" ta="center">{page?.text}</Text>
          </View>
        ))}
      </PagerView>

      {currentPage === 3 ? (
        <View style={styles.buttonsView}>
          <Button
            icon="login"
            mode="contained"
            style={{ marginBottom: 20 }}
            onPress={() => router.push("/signIn")}
          >
            ENTRAR
          </Button>

          <Button
            icon="account-plus"
            style={{ marginBottom: 20 }}
            onPress={() => router.push("/signUp")}
          >
            CRIAR CONTA
          </Button>
        </View>
      ) : (
        <View style={styles.stepsView}>
          <View style={{ flexDirection: "row" }}>
            {pages?.map((page, i) => (
              <View key={i}
                style={{
                  ...styles.circleBase,
                  width: currentPage === i ? 25 : 10,
                  backgroundColor: currentPage === i ? colors.primary : colors.background6
                }}
              />
            ))}
          </View>

          <IconButton
            size={30}
            icon="arrow-right"
            iconColor={colors.background}
            onPress={() => setCurrentPage(prev => prev + 1)}
            style={{
              borderRadius: 120,
              width: 60, height: 60,
              backgroundColor: colors.primary,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  buttonsView: {
    bottom: 20,
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
  },

  stepsView: {
    bottom: 20,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  circleBase: {
    height: 10,
    borderRadius: 40,
    marginHorizontal: 5,
  },

});
