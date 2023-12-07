import { View } from "react-native";
import { useEffect } from "react";
import { Avatar, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import { useAppTheme } from "../../theme";
import { Module, Section } from "../../types";
import { Header, Text } from "../../components";

const section: Section = {
  xpType: 0,
  level: "EASY",
  experience: 200,
  segment: "carrer",
  answeredBy: ["1", "2", "3"],
  answered: [
    ["Blá blá blá", "Blá blá blá", "Blá blá blá",],
    ["Naruto", "Goku", "Gon"],
  ],

  questions: [
    {
      type: "SUBJECTIVE",
      description: "Qual melhor anime na sua opnião?",
    },

    {
      type: "OBJECTIVE",
      description: "Qual melhor protagonista?",
      options: ["Naruto", "Luffy", "Goku", "Gon"]
    }
  ],
};

export default function StartQuestions() {
  const { colors } = useAppTheme();
  const { color, description, label, icon, id } = useLocalSearchParams<Partial<Module>>();

  /*
    Cada módulo de perguntas vai possuir uma lista de Seções.
    Cada Seção terá sua lista de perguntas e guardará os IDs dos usuários que já responderam;
    Quando fizer a busca por Seções trazer apenas as que o usuário não respondeu. 
  */

  useEffect(() => {
    console.log(id);
    //  BUSCAR A LISTA DE PERGUNTAS

    //  E SALVAR NO CACHE

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
          <Text fw="MEDIUM" fs={16} color={colors.background}>0 / 2</Text>
          <Button
            mode="contained"
            style={{ width: "100%" }}
            onPress={() => router.push({
              pathname: "/stack/sectionResolving",
              params: { section: JSON.stringify(section), color, icon },
            })}
          >
            COMEÇAR
          </Button>
        </View>
      </View>

    </View>
  );
}