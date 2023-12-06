import { useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button, IconButton, ProgressBar, TextInput } from "react-native-paper";

import { Text } from "../../components";
import { useAppTheme } from "../../theme";
import { Section, SectionResolvingProps } from "../../types";

export default function SectionResolving() {
  const { colors } = useAppTheme();
  const [percentSection, setPercentSection] = useState(0);
  const { color, icon, section } = useLocalSearchParams<Partial<SectionResolvingProps>>();

  const mainSection: Section = JSON.parse(section!);

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size={25}
          icon="arrow-left"
          style={{ margin: 0 }}
          iconColor={colors.background}
          onPress={() => router.back()}
        />

        <ProgressBar progress={percentSection} color={colors.background} style={{ backgroundColor: colors.color10, borderRadius: 20, height: 6, width: 200 }} />

        <View style={{ width: 45 }} />
      </View>

      <Avatar.Icon
        icon={icon!}
        color={colors.background}
        style={{ margin: 0, backgroundColor: "transparent", alignSelf: "center" }}
      />

      <PagerView
        style={{ flex: 1 }}
        onPageScroll={e => setPercentSection(e.nativeEvent.position / mainSection?.questions.length)}
      >
        {mainSection?.questions?.map((question, i) => (
          <View key={i} style={{ flex: 1, paddingHorizontal: 20 }}>

            <Text fs={16} ta="center">{question?.description}</Text>

            {question?.type === "SUBJECTIVE" ? (
              <View style={{ marginTop: 40 }}>
                <TextInput
                  placeholder="Sua resposta"
                  placeholderTextColor="#00000090"
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            ) : (
              <View style={{ marginTop: 30 }}>
                {question?.options?.map((option, i) => (
                  <View
                    key={i}
                    style={{
                      borderWidth: .7,
                      borderRadius: 80,
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: colors.color,
                    }}
                  >

                    <Avatar.Text
                      size={50}
                      label={option.option}
                      style={{ marginRight: 12 }}
                    />

                    <Text fs={16} fw="MEDIUM" style={{ flex: 1 }}>{option?.value}</Text>

                  </View>
                ))}
              </View>
            )}

          </View>
        ))}
      </PagerView>

      <Button mode="contained" style={{ marginHorizontal: 20, marginBottom: 20 }}>CONTINUAR</Button>

    </View>
  );
}