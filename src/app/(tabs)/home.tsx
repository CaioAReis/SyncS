import { Avatar } from "react-native-paper";
import { ScrollView, View } from "react-native";

import { useAppTheme } from "../../theme";
import { Banners, HomeButton, Text } from "../../components";

export default function Home() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", margin: 20, alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text fw="MEDIUM" fs={22}>Olá, Caio</Text>
            <Text fs={14} style={{ color: colors.color1, flex: 1, lineHeight: 20, marginTop: 10 }}>
              {"Responda as perguntas \ndas categorias abaixo!"}
            </Text>
          </View>

          <Avatar.Image size={70} source={{ uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=Aneka" }} />
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
              <HomeButton icon="play-network" label="Carreira" height={180} color={colors.red} />
              <HomeButton icon="school" label="Formação Acadêmica" height={300} color={colors.purple} />
              <HomeButton icon="help-circle-outline" label="Dúvida dos Ingressos" height={260} color={colors.yellow} />
            </View>

            <View style={{ width: 16 }} />

            <View style={{ flex: 1 }}>
              <HomeButton icon="office-building" label="Mercado de Trabalho" height={300} color={colors.blue} />
              <HomeButton icon="chart-timeline-variant-shimmer" label="Desenvolvimento Pessoal" height={260} color={colors.green} />
              <HomeButton icon="tooltip-account" label="Sobre você" height={180} color={colors.gray} />
            </View>
          </View>
          <HomeButton icon="arrow-decision-outline" label="Recomende" horizontal height={110} color={colors.pink} />
        </View>

      </ScrollView>
    </View>
  );
}