import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button, IconButton, ProgressBar, TextInput } from "react-native-paper";

import { Text } from "../../components";
import { useAppTheme } from "../../theme";
import { Section, SectionResolvingProps } from "../../types";

/*

const response = [
  "Blá blá blá",    -> SUBJECTIVE
  "A",              -> OBJECTIVE
  ...
];

*/

const optionLabels = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N" ];

export default function SectionResolving() {
  const { colors } = useAppTheme();
  const __pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [percentSection, setPercentSection] = useState(0);
  const { color, icon, section } = useLocalSearchParams<Partial<SectionResolvingProps>>();

  const mainSection: Section = JSON.parse(section!);

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <View style={styles.header}>
        <IconButton
          size={25}
          icon="arrow-left"
          style={{ margin: 0 }}
          iconColor={colors.light1}
          onPress={() => currentPage > 0 ? __pagerRef.current?.setPage(currentPage - 1) : router.back()}
        />

        <ProgressBar
          progress={percentSection}
          color={colors.background}
          style={{ backgroundColor: colors.dark10, borderRadius: 20, height: 6, width: 200 }}
        />

        <View style={{ width: 45 }} />
      </View>

      <Avatar.Icon
        icon={icon!}
        color={colors.light1}
        style={{ margin: 0, backgroundColor: "transparent", alignSelf: "center" }}
      />

      <PagerView
        ref={__pagerRef}
        style={{ flex: 1 }}
        onPageScroll={e => {
          setCurrentPage(e.nativeEvent.position);
          setPercentSection(e.nativeEvent.position / mainSection?.questions!.length || 0);
        }}
      >
        {mainSection?.questions?.map((question, i) => (
          <View key={i} style={{ flex: 1, paddingHorizontal: 20 }}>

            <Text color={colors.light1} fs={16} ta="center">{question?.description}</Text>

            {question?.type === "SUBJECTIVE" ? (

              <View style={{ marginTop: 40 }}>
                <TextInput
                  textColor={colors.light1}
                  placeholder="Sua resposta"
                  placeholderTextColor={colors.light4}
                  style={{ backgroundColor: colors.dark12 }}
                />
              </View>

            ) : (

              <View style={{ marginTop: 30 }}>
                {question?.options?.map((option, i) => (
                  <View
                    key={i}
                    style={{
                      ...styles.optionView,
                      borderColor: colors.light4,
                      backgroundColor: colors.dark12,
                    }}
                  >

                    <Avatar.Text
                      size={50}
                      label={optionLabels[i]}
                      labelStyle={{ color: color }}
                      style={{ backgroundColor: colors.light, marginRight: 12 }}
                    />

                    <Text
                      fs={16}
                      fw="MEDIUM"
                      style={{ flex: 1 }}
                      color={colors.light}
                    >
                      {option}
                    </Text>

                  </View>
                ))}
              </View>

            )}
          </View>
        ))}
      </PagerView>

      <Button
        mode="contained"
        style={{ marginHorizontal: 20, marginBottom: 20 }}
        onPress={() => __pagerRef.current?.setPage(currentPage + 1)}
      >
        CONTINUAR
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    marginTop: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionView: {
    borderWidth: .7,
    borderRadius: 80,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  }

});