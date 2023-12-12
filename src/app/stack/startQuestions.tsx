import { View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useAppTheme } from "../../theme";
import { Module, Section } from "../../types";
import { Header, Text } from "../../components";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";

export default function StartQuestions() {
  const { colors } = useAppTheme();
  const [sections, setSection] = useState<Section[]>([]);
  const { session, isLoading, setIsLoading } = useContext(AppContext);
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const { color, description, label, icon, segment } = useLocalSearchParams<Partial<Module>>();

  const getList = async () => {
    const q = query(
      collection(db, "sections"),
      where("segment", "==", segment),
    );

    await getDocs(q).then(result => {
      setSection(result.docs.map(doc => {

        if (doc.data()?.answers?.some((item: Section) => item?.user === session?.id)) {
          setResolvedCount(prev => prev + 1);
        }

        return { id: doc.id, ...doc.data() } as Section;
      }));
    })
      .catch(error => console.error("Ocorreu um erro: " + error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {

    //  BUSCAR A LISTA DE PERGUNTAS
    setIsLoading(true);
    getList();

  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <Header color={colors.background} />

      <View style={{ alignItems: "center", marginTop: "12%" }}>
        <Text color={colors.background} fs={24} fw="SEMIB">{label}</Text>

        <Avatar.Icon
          size={180}
          icon={icon!}
          color={colors.background}
          style={{ backgroundColor: "transparent" }}
        />

        <Text
          fs={16}
          lh={22}
          ta="center"
          fw="SEMIB"
          color={colors.background}
          style={{ paddingHorizontal: 30 }}
        >
          {description}
        </Text>

        <View style={{ alignItems: "center", marginTop: "15%", width: "80%" }}>
          {!isLoading && (
            <Text fw="MEDIUM" fs={14} style={{ marginBottom: 6 }} color={colors.background}>
              {resolvedCount} / {sections?.length}
            </Text>
          )}

          <Button
            mode="contained"
            style={{ width: "100%" }}
            disabled={resolvedCount >= sections?.length}
            onPress={() => router.push({
              pathname: "/stack/sectionResolving",
              params: { section: JSON.stringify(sections[resolvedCount]), color, icon },
            })}
          >
            COMEÇAR
          </Button>

          {!isLoading && resolvedCount >= sections?.length && (
            <Text ta="center" fs={14} lh={16} style={{ marginTop: 30 }}>
              Você concluiu todas as seções deste módulo. Aguarde por novas perguntas.
            </Text>
          )}
        </View>
      </View>

    </View>
  );
}