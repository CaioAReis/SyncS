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

// const section: Section = {
//   xpType: 0,
//   level: "EASY",
//   experience: 200,
//   segment: "carrer",
//   answeredBy: ["1", "2", "3"],
//   answers: [
//     ["Blá blá blá", "Blá blá blá", "Blá blá blá",],
//     ["Naruto", "Goku", "Gon"],
//   ],

//   questions: [
//     {
//       type: "SUBJECTIVE",
//       description: "Qual melhor anime na sua opnião?",
//     },

//     {
//       type: "OBJECTIVE",
//       description: "Qual melhor protagonista?",
//       options: ["Naruto", "Luffy", "Goku", "Gon"]
//     }
//   ],
// };

export default function StartQuestions() {
  const { colors } = useAppTheme();
  const { session, setIsLoading } = useContext(AppContext);
  const [sections, setSection] = useState<Section[]>([]);
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const { color, description, label, icon, segment } = useLocalSearchParams<Partial<Module>>();

  /*
    Cada módulo de perguntas vai possuir uma lista de Seções.
    Cada Seção terá sua lista de perguntas e guardará os IDs dos usuários que já responderam;
    Quando fizer a busca por Seções trazer apenas as que o usuário não respondeu. 
  */

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
          <Text fw="MEDIUM" fs={16} color={colors.background}>{resolvedCount} / {sections?.length}</Text>
          <Button
            mode="contained"
            style={{ width: "100%" }}
            onPress={() => router.push({
              pathname: "/stack/sectionResolving",
              params: { section: JSON.stringify(sections[resolvedCount]), color, icon },
            })}
          >
            COMEÇAR
          </Button>
        </View>
      </View>

    </View>
  );
}