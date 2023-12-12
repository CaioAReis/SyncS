import PagerView from "react-native-pager-view";
import { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Avatar, Button, IconButton, ProgressBar, TextInput, TouchableRipple } from "react-native-paper";

import { Text } from "../../components";
import { useAppTheme } from "../../theme";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";
import { Section, SectionResolvingProps, User } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

interface SelectableProps {
  i: number,
  option: string,
  selected: boolean,
  onPress: () => void,
}

const Selectable = ({ option, i, selected, onPress }: SelectableProps) => {
  const { colors } = useAppTheme();

  return (
    <View style={{ overflow: "hidden", borderRadius: 100, }}>
      <TouchableRipple
        onPress={onPress}
        rippleColor={colors.light11}
        style={{
          ...styles.optionView,
          borderColor: selected ? colors.light4 : colors.dark4,
          backgroundColor: selected ? colors.light11 : "transparent"
        }}
      >
        <>
          <Avatar.Text
            size={50}
            label={optionLabels[i]}
            labelStyle={{ color: selected ? colors.dark : colors.light }}
            style={{ backgroundColor: selected ? colors.light : colors.dark4 }}
          />

          <Text
            fs={14}
            fw="SEMIB"
            color={selected ? colors.dark : colors.light}
            style={{ flex: 1, marginLeft: 12, marginRight: 20 }}
          >
            {option}
          </Text>
        </>
      </TouchableRipple>
    </View>
  );
};

interface QuestionOBJ {
  [key: string]: string,
}

const xpTypes = ["ship-wheel", "sword-cross", "brain"];

const checkAchievement = (user: User) => {
  const { setEarnings } = useContext(AppContext);

  console.warn(user);

  if (user.solvedModules.total > 1) {
    /*  VERIFICAÇÃO DAS QUANTIDADES DE PERGUNTAS RESOLVIDAS - RECOMPENSAS DE PERGUNTAS
          CONSUISTA DE 50 PERGUNTAS RESOLVIDAS
          CONSUISTA DE 100 PERGUNTAS RESOLVIDAS
          CONSQUISTA DE 50 PERGUNTAS RESOLVIDAS DE CADA MÓDULO
    */

    /*  VERIFICAÇÃO DAS QUANTIDADES DE MÓDULOS RESOLVIDOS - RECOMPENSAS DE MÓDULOS
          CONQUISTA DE PRIMEIRO MÓDULO RESOLVIDO
          CONQUISTA DE 10 MÓDULOS RESOLVIDOS
          CONQUISTA DE RESOLVER TODOS OS MÓDULOS UMA VEZ
          CONQUISTA DE RESOLVER CADA MÓDULO 5x
    */

    /*  VERIFICAÇÃO DOS NÍVEIS - RECOMPENSAS DE NÍVEL
          CONQUISTA DE NÍVEL DE SABEDORIA 10
          CONQUISTA DE NÍVEL DE EXPERIÊNCIA 10
          CONQUISTA DE NÍVEL DE PROFISSIONALISMO 10
    
          CONQUISTA DE NÍVEL DE SABEDORIA 20
          CONQUISTA DE NÍVEL DE EXPERIÊNCIA 20
          CONQUISTA DE NÍVEL DE PROFISSIONALISMO 20
    
          CONQUISTA DE NÍVEL DE SABEDORIA 30
          CONQUISTA DE NÍVEL DE EXPERIÊNCIA 30
          CONQUISTA DE NÍVEL DE PROFISSIONALISMO 30
    */

    //  INICIANTE PROMISSOR
  } else return setEarnings({ image: "", type: "ACHIEVEMENT", title: "Iniciante Promissor" });
};

export default function SectionResolving() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const __pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [percentSection, setPercentSection] = useState(0);
  const { session, setSession, setIsLoading } = useContext(AppContext);
  const { color, icon, section } = useLocalSearchParams<Partial<SectionResolvingProps>>();

  const mainSection: Section = JSON.parse(section!);
  const qtdQuestions = mainSection?.questions?.length;

  const { control, handleSubmit, formState: { errors } } = useForm<QuestionOBJ>({
    defaultValues: Object.assign<QuestionOBJ, QuestionOBJ[]>({}, new Array(qtdQuestions)),
  });

  const onSubmit = async (data: QuestionOBJ) => {
    if (currentPage === qtdQuestions) return router.push("/home");

    if (currentPage === qtdQuestions! - 1) {
      setIsLoading(true);

      // ENVIANDO AS RESPOSTAS
      const sectionRef = doc(db, "sections", mainSection.id);
      await updateDoc(sectionRef, { answers: arrayUnion({ ...data, user: session?.id }) })
        .then(async () => {

          const userRef = doc(db, "users", session!.id!);

          const levelBase = {
            wisdomLevel: mainSection?.xpType === 2 ? mainSection?.experience : 0,
            professionalismLevel: mainSection?.xpType === 1 ? mainSection?.experience : 0,
            experienceLevel: (mainSection?.experience * 0.10) + (mainSection?.xpType ? 0 : mainSection?.experience),
          };

          // ATUALIZANDO COM AS EXPERIÊNCIAS RECEBIDAS
          await updateDoc(
            userRef,
            {
              wisdomLevel: increment(levelBase.wisdomLevel),
              experienceLevel: increment(levelBase.experienceLevel),
              professionalismLevel: increment(levelBase.professionalismLevel),

              "solvedModules.total": increment(1),
              [`solvedModules.${mainSection?.segment}`]: increment(1),

              "solvedQuestions.total": increment(qtdQuestions!),
              [`solvedQuestions.${mainSection?.segment}`]: increment(qtdQuestions!),
            }
          );

          const userBody: Partial<User> = {
            ...session,
            wisdomLevel: session!.wisdomLevel! + levelBase.wisdomLevel,
            experienceLevel: session!.experienceLevel! + levelBase.experienceLevel,
            professionalismLevel: session!.professionalismLevel! + levelBase.professionalismLevel,

            solvedModules: {
              ...session!.solvedModules,
              total: session!.solvedModules!.total + 1,
              [mainSection?.segment]: session!.solvedModules![mainSection?.segment] + 1,
            },

            solvedQuestions: {
              ...session!.solvedQuestions,
              total: session!.solvedQuestions!.total + qtdQuestions!,
              [mainSection?.segment]: session!.solvedQuestions![mainSection?.segment] + qtdQuestions!,
            }
          };

          // VERIFICAR SE VAI GANHAR ALGUMA CONQUISTA
          // checkAchievement(userBody);

          // ATUALIZANDO O USER DO STORAGE E DO CONTEXTO
          await AsyncStorage.setItem("syncs_user", JSON.stringify(userBody))
            .then(() => {
              setSession(userBody as User);
              return __pagerRef.current?.setPage(currentPage + 1);
            })
            .catch((error) => console.error("Error no storage", error));

          // Randomizar se vai ganhar algo ou não!!
        })
        .catch(e => console.error(e))
        .finally(() => setIsLoading(false));
    }

    return __pagerRef.current?.setPage(currentPage + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <View style={styles.header}>
        {currentPage === qtdQuestions ? <View style={{ width: 46, height: 41 }} /> : (
          <IconButton
            size={25}
            icon="arrow-left"
            style={{ margin: 0 }}
            iconColor={colors.light1}
            onPress={() => currentPage > 0 ? __pagerRef.current?.setPage(currentPage - 1) : router.back()}
          />
        )}

        <ProgressBar
          progress={percentSection}
          color={colors.background}
          style={{ backgroundColor: colors.dark10, borderRadius: 20, height: 6, width: 200 }}
        />

        <View style={{ width: 46 }} />
      </View>

      <Avatar.Icon
        icon={icon!}
        color={colors.light1}
        style={{ margin: 0, backgroundColor: "transparent", alignSelf: "center" }}
      />

      <PagerView
        ref={__pagerRef}
        style={{ flex: 1 }}
        scrollEnabled={false}
        onPageScroll={e => {
          setCurrentPage(e.nativeEvent.position);
          setPercentSection(e.nativeEvent.position / mainSection?.questions!.length);
        }}
      >
        {mainSection?.questions?.map((question, i) => (
          <View key={i} style={{ width: width, flex: 1, paddingHorizontal: 20 }}>
            <Text color={colors.light1} fs={16} ta="center">{question?.description}</Text>

            {question?.type === "SUBJECTIVE" ? (
              currentPage === i ? (
                <>
                  <Controller
                    name={String(i)}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={{ marginTop: 40 }}>
                        <TextInput
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          textColor={colors.dark3}
                          placeholder="Sua resposta"
                          placeholderTextColor={colors.dark6}
                          style={{ backgroundColor: colors.light11 }}
                        />
                      </View>
                    )}
                  />
                  {errors[i] && (
                    <View style={{ ...styles.errorView, borderColor: colors.red6, backgroundColor: colors.red2 }}>
                      <Avatar.Icon
                        size={22}
                        icon="close"
                        color={colors.light}
                        style={{ margin: 0, backgroundColor: colors.red6 }}
                      />
                      <Text color={colors.red6} fs={14} lh={18} fw="BOLD" style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                        Para continuar responda a pergunta
                      </Text>
                    </View>
                  )}
                </>
              ) : null
            ) : (
              currentPage === i ? (
                <ScrollView>
                  <Controller
                    name={String(i)}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View style={{ marginTop: 30 }}>
                        {question?.options?.map((option, i) => (
                          <Selectable
                            i={i}
                            key={i}
                            option={option}
                            selected={optionLabels[i] === value}
                            onPress={() => onChange(optionLabels[i])}
                          />
                        ))}
                      </View>
                    )}
                  />
                  {errors[i] && (
                    <View style={{ ...styles.errorView, borderColor: colors.red6, backgroundColor: colors.red2 }}>
                      <Avatar.Icon
                        size={22}
                        icon="close"
                        color={colors.light}
                        style={{ margin: 0, backgroundColor: colors.red6 }}
                      />
                      <Text color={colors.red6} fs={14} lh={18} fw="BOLD" style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                        Para continuar selecione uma opção
                      </Text>
                    </View>
                  )}
                </ScrollView>
              ) : null
            )}
          </View>
        ))}

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text fs={30} fw="BOLD">Parabéns!</Text>

          <Image
            source={require("../../../assets/images/Success.png")}
            style={{ marginTop: 15, width: width / 1.5, height: width / 1.5 }}
          />

          <Text
            fs={16}
            fw="BOLD"
            ta="center"
            style={{ marginVertical: 20, marginHorizontal: 30 }}
          >
            Ótimo! Você concluiu esta bateria de perguntas, veja suas reconpensas e aguarde por novos desafios!
          </Text>

          <View style={styles.xpView}>
            <Avatar.Icon
              size={45}
              icon={xpTypes[0]}
              style={{ backgroundColor: colors.dark4 }}
            />
            <Text fw="BOLD" ta="center" style={{ flex: 1 }}>
              +{(mainSection?.experience * 0.10) + (mainSection?.xpType ? 0 : mainSection?.experience)} pontos
            </Text>
          </View>

          {mainSection?.xpType !== 0 && (
            <View style={styles.xpView}>
              <Avatar.Icon
                size={45}
                icon={xpTypes[mainSection.xpType]}
                style={{ backgroundColor: colors.dark4 }}
              />
              <Text fw="BOLD" ta="center" style={{ flex: 1 }}>+{mainSection?.experience} pontos</Text>
            </View>
          )}
        </View>
      </PagerView>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginHorizontal: 20, marginBottom: 20 }}
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
    borderWidth: 1,
    borderRadius: 80,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  errorView: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  xpView: {
    width: "60%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  }

});