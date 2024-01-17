import { useContext } from "react";
import { Avatar } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";

import { useAppTheme } from "../../theme";
import AppContext from "../../services/AppContext";
import { Banners, HomeButton, Text } from "../../components";

export default function Home() {
  const { colors } = useAppTheme();
  const { session } = useContext(AppContext);

  const styles = StyleSheet.create({

    content: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      margin: 20,
      flexDirection: "row",
      alignItems: "center",
    },

    headerTxt: {
      flex: 1,
      marginTop: 10,
      lineHeight: 20,
      color: colors.color1,
    }

  });

  return (
    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text fw="MEDIUM" fs={22}>Olá, {session?.nickname}</Text>
            <Text fs={14} style={styles.headerTxt}>
              {"Responda as perguntas \ndas categorias abaixo!"}
            </Text>
          </View>

          <Avatar.Image
            size={70}
            source={{ uri: session?.picture }}
          />
        </View>

        <Banners
          banners={[
            { thumb: "https://res.cloudinary.com/dqtkqo2a8/image/upload/v1705500323/SyncS/Banners/Banner1_h24vz7.png", action: () => { } },
            { thumb: "https://res.cloudinary.com/dqtkqo2a8/image/upload/v1705502118/SyncS/Banners/Banner2_z9oodo.png", action: () => { } },
            { thumb: "https://res.cloudinary.com/dqtkqo2a8/image/upload/v1705503244/SyncS/Banners/Banner3_qd5k8c.png", action: () => { } },
          ]}
        />

        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <HomeButton
                height={180}
                segment="carrer"
                label="Carreira"
                color={colors.red}
                icon="briefcase-check"
                description="Serão abordadas suas principais conquistas, os desafios enfrentados no mercado de trabalho e como o curso os preparou para atuar no setor."
              />

              <HomeButton
                height={300}
                icon="school"
                segment="academic"
                color={colors.purple}
                label="Formação Acadêmica"
                description="Serão levantados os pontos fortes do curso, sugestões para o aprimoramento curricular e a importância da formação contínua após a graduação."
              />

              <HomeButton
                height={260}
                segment="doubts"
                color={colors.yellow}
                icon="help-circle-outline"
                label="Dúvida dos Ingressos"
                description="Serão apresentados dúvidas frequentes dos estudantes do Curso de Bacharelado em Sistema de Informação."
              />
            </View>

            <View style={{ width: 16 }} />

            <View style={{ flex: 1 }}>
              <HomeButton
                height={300}
                segment="job"
                icon="chart-arc"
                color={colors.blue}
                label="Mercado de Trabalho"
                description="Serão discutidas as áreas de atuação, responsabilidades em seus cargos e conselhos valiosos para aqueles que desejam ingressar nesse mercado."
              />

              <HomeButton
                height={260}
                icon="star-face"
                segment="evolution"
                color={colors.green}
                label="Desenvolvimento Pessoal"
                description=" Serão discutidas estratégias para o desenvolvimento soft skills e os principais aprendizados não acadêmicos após a graduação."
              />

              <HomeButton
                height={180}
                segment="user"
                label="Sobre você"
                icon="gesture-tap"
                color={colors.gray}
                description="Vamos conhecê-lo(a) melhor. Compartilhe um pouco da sua trajetória, interesses e ambições. Queremos entender suas motivações e experiências pessoais."
              />
            </View>
          </View>

          <HomeButton
            horizontal
            height={110}
            label="Recomende"
            color={colors.pink}
            icon="comment-check"
            segment="recommendation"
            description="Recomende cursos, trabalhos, projetos, estágios ou qualquer outra oportunidade que tenha enriquecido sua jornada profissional. Suas sugestões ajudarão a direcionar futuros profissionais da área na busca por oportunidades de crescimento."
          />
        </View>

      </ScrollView>
    </View>
  );
}