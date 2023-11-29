import { Avatar } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";

import { useAppTheme } from "../../theme";
import { Banners, HomeButton, Text } from "../../components";

export interface SessionButton {
  _id: string,
  icon: string,
  color: string,
  title: string,
  levels?: Level[],
  description: string,
}

export interface Level {
  _id: string,
  _idSession: string,
  questions: Question[],
  level: "EASY" | "NORMAL" | "HARD",
}

export interface Question {
  _id: string,
  options?: [],
  description: string,
  multipleOptions: boolean,
  type: "SUBJECTIVE" | "OBJECTIVE",
}

export default function Home() {
  const { colors } = useAppTheme();

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
            <Text fw="MEDIUM" fs={22}>Olá, Caio</Text>
            <Text fs={14} style={styles.headerTxt}>
              {"Responda as perguntas \ndas categorias abaixo!"}
            </Text>
          </View>

          <Avatar.Image
            size={70}
            source={{ uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=Aneka" }}
          />
        </View>

        <Banners
          banners={[
            { thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6kVrWhXQQN_I2r8MsTHg3gHaFC%26pid%3DApi&f=1&ipt=d43019c7d4db864387709b139fbbe655f2b172af43076593fc5a865635d7db1e&ipo=images", action: () => { } },
            { thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.p3yvO0laFDXIPpkniozoVAHaCQ%26pid%3DApi&f=1&ipt=747c6ff5747e0b16f6629f6d2e58ab9ab6136c02c339ff66a60e41f38e441992&ipo=images", action: () => { } },
            { thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.1kO65vjFgOjhuAkzmSlKRAHaDE%26pid%3DApi&f=1&ipt=f38b23cc2b4b0c623e1dcc73ed321662845cb23b1ea74dc5987fb81539bcf5ff&ipo=images", action: () => { } },
          ]}
        />

        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <HomeButton
                height={180}
                label="Carreira"
                color={colors.red}
                icon="briefcase-check"
              />

              <HomeButton
                height={300}
                icon="school"
                color={colors.purple}
                label="Formação Acadêmica"
              />

              <HomeButton
                height={260}
                color={colors.yellow}
                icon="help-circle-outline"
                label="Dúvida dos Ingressos"
              />
            </View>

            <View style={{ width: 16 }} />

            <View style={{ flex: 1 }}>
              <HomeButton
                height={300}
                icon="chart-arc"
                color={colors.blue}
                label="Mercado de Trabalho"
              />

              <HomeButton
                height={260}
                icon="star-face"
                color={colors.green}
                label="Desenvolvimento Pessoal"
              />

              <HomeButton
                height={180}
                label="Sobre você"
                icon="gesture-tap"
                color={colors.gray}
              />
            </View>
          </View>

          <HomeButton
            horizontal
            height={110}
            label="Recomende"
            color={colors.pink}
            icon="comment-check"
          />
        </View>

      </ScrollView>
    </View>
  );
}