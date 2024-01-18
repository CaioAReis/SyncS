import PagerView from "react-native-pager-view";
import { useContext, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Avatar, Button, IconButton, ProgressBar, TextInput, TouchableRipple } from "react-native-paper";
import { arrayUnion, collection, doc, documentId, getDocs, increment, query, updateDoc, where } from "firebase/firestore";

import { Text } from "../../components";
import { useAppTheme } from "../../theme";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";
import { AchievementProps, FigureProps, Section, SectionResolvingProps, User } from "../../types";

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

const checkAchievement = async (
  user: Partial<User>,
  checkLevel: ({ levelType }: { levelType: number }) => number
): Promise<[string[], Partial<AchievementProps>[]]> => {
  const achievementIDs = [];

  //  CONQUISTA DE PRIMEIRO MÓDULO RESOLVIDO
  if (user.solvedModules!.total >= 0 && !user.achievements?.includes("wXCt4WjiVLVzkS3uw9nC")) achievementIDs.push("wXCt4WjiVLVzkS3uw9nC");

  //   VERIFICAÇÃO DAS QUANTIDADES DE PERGUNTAS RESOLVIDAS - RECOMPENSAS DE PERGUNTAS
  //  CONSUISTA DE 50 PERGUNTAS RESOLVIDAS
  if (user.solvedQuestions!.total >= 50 && !user.achievements?.includes("jpP4iYnoxOwvm5SwLyAu")) achievementIDs.push("jpP4iYnoxOwvm5SwLyAu");
  //  CONSUISTA DE 100 PERGUNTAS RESOLVIDAS
  if (user.solvedQuestions!.total >= 100 && !user.achievements?.includes("ZOALdX2Bc9VxpSzy1CqS")) achievementIDs.push("ZOALdX2Bc9VxpSzy1CqS");
  //  CONSUISTA DE 50 PERGUNTAS ACADÊMICAS RESOLVIDAS
  if (user.solvedQuestions!.academic >= 50 && !user.achievements?.includes("EYxkYp5Cab2SlGTIbCnR")) achievementIDs.push("EYxkYp5Cab2SlGTIbCnR");
  //  CONSUISTA DE 50 PERGUNTAS CARREIRA RESOLVIDAS
  if (user.solvedQuestions!.carrer >= 50 && !user.achievements?.includes("xbO69htTS5WCMkxnYe4U")) achievementIDs.push("xbO69htTS5WCMkxnYe4U");
  //  CONSUISTA DE 50 DÚVIDAS RESOLVIDAS
  if (user.solvedQuestions!.doubts >= 50 && !user.achievements?.includes("E02j0OuV99DVTd2sktbG")) achievementIDs.push("E02j0OuV99DVTd2sktbG");
  //  CONSUISTA DE 50 PERGUNTAS DE EVOLUÇÃO RESOLVIDAS
  if (user.solvedQuestions!.evolution >= 50 && !user.achievements?.includes("kP3FFinlPXH3oDpQETpc")) achievementIDs.push("kP3FFinlPXH3oDpQETpc");
  //  CONSUISTA DE 50 PERGUNTAS MERCADO RESOLVIDAS
  if (user.solvedQuestions!.job >= 50 && !user.achievements?.includes("eW3jJ9gGABYVwIFJlBvC")) achievementIDs.push("eW3jJ9gGABYVwIFJlBvC");
  //  CONSUISTA DE 50 RECOMENDAÇÕES RESOLVIDAS
  if (user.solvedQuestions!.recommendation >= 50 && !user.achievements?.includes("qx4xO9zP0PPe7TOj99ic")) achievementIDs.push("qx4xO9zP0PPe7TOj99ic");
  //  CONSUISTA DE 50 PERGUNTAS USÁRIO RESOLVIDAS
  if (user.solvedQuestions!.user >= 50 && !user.achievements?.includes("TDvSvuvlsh1KUmE8vwJ3")) achievementIDs.push("TDvSvuvlsh1KUmE8vwJ3");

  //  VERIFICAÇÃO DAS QUANTIDADES DE MÓDULOS RESOLVIDOS - RECOMPENSAS DE MÓDULOS
  //  CONQUISTA DE 10 MÓDULOS RESOLVIDOS
  if (user.solvedModules!.total >= 10 && !user.achievements?.includes("8u7YRrogjgFcGaYBCiYz")) achievementIDs.push("8u7YRrogjgFcGaYBCiYz");
  //  CONQUISTA DE 20 MÓDULOS RESOLVIDOS
  if (user.solvedModules!.total >= 20 && !user.achievements?.includes("AgSane3A8Bro1qCFhzSz")) achievementIDs.push("AgSane3A8Bro1qCFhzSz");
  //  CONQUISTA DE RESOLVER TODOS OS MÓDULOS UMA VEZ
  if (
    user.solvedModules!.user > 0 &&
    user.solvedModules!.job > 0 &&
    user.solvedModules!.carrer > 0 &&
    user.solvedModules!.doubts > 0 &&
    user.solvedModules!.academic > 0 &&
    user.solvedModules!.evolution > 0 &&
    user.solvedModules!.recommendation > 0
    && !user.achievements?.includes("loAXc5SlwuyhWzZv0RkX")
  ) achievementIDs.push("loAXc5SlwuyhWzZv0RkX");

  //  VERIFICAÇÃO DOS NÍVEIS - RECOMPENSAS DE NÍVEL
  //  CONQUISTA DE NÍVEL DE SABEDORIA 10
  if (checkLevel({ levelType: user?.wisdomLevel ?? 0 }) >= 10 && !user.achievements?.includes("rwZZqwlO7O9FzJ92O9n0")) achievementIDs.push("rwZZqwlO7O9FzJ92O9n0");
  //  CONQUISTA DE NÍVEL DE EXPERIÊNCIA 10
  if (checkLevel({ levelType: user?.experienceLevel ?? 0 }) >= 10 && !user.achievements?.includes("MiHohz5yMM4UwE5ubeNd")) achievementIDs.push("MiHohz5yMM4UwE5ubeNd");
  //  CONQUISTA DE NÍVEL DE PROFISSIONALISMO 10
  if (checkLevel({ levelType: user?.professionalismLevel ?? 0 }) >= 10 && !user.achievements?.includes("ITNi35Z7wTtee82SHeFO")) achievementIDs.push("ITNi35Z7wTtee82SHeFO");

  //  CONQUISTA DE NÍVEL DE SABEDORIA 20
  if (checkLevel({ levelType: user?.wisdomLevel ?? 0 }) >= 20 && !user.achievements?.includes("3QL5VODqRBqshbRvGbGQ")) achievementIDs.push("3QL5VODqRBqshbRvGbGQ");
  //  CONQUISTA DE NÍVEL DE EXPERIÊNCIA 20
  if (checkLevel({ levelType: user?.experienceLevel ?? 0 }) >= 20 && !user.achievements?.includes("kJdz4SsajrdbGsTnH6uJ")) achievementIDs.push("kJdz4SsajrdbGsTnH6uJ");
  //  CONQUISTA DE NÍVEL DE PROFISSIONALISMO 20
  if (checkLevel({ levelType: user?.professionalismLevel ?? 0 }) >= 20 && !user.achievements?.includes("ITvq9xpIsw86phQM6BZ6")) achievementIDs.push("ITvq9xpIsw86phQM6BZ6");

  //  CONQUISTA DE NÍVEL DE SABEDORIA 30
  if (checkLevel({ levelType: user?.wisdomLevel ?? 0 }) >= 30 && !user.achievements?.includes("h9f1GXofJ8o6GoMkmdBL")) achievementIDs.push("h9f1GXofJ8o6GoMkmdBL");
  //  CONQUISTA DE NÍVEL DE EXPERIÊNCIA 30
  if (checkLevel({ levelType: user?.experienceLevel ?? 0 }) >= 30 && !user.achievements?.includes("LQfEzClIKShs59mz6gmp")) achievementIDs.push("LQfEzClIKShs59mz6gmp");
  //  CONQUISTA DE NÍVEL DE PROFISSIONALISMO 30
  if (checkLevel({ levelType: user?.professionalismLevel ?? 0 }) >= 30 && !user.achievements?.includes("IXlo9YNPQxb0EkpdxNP4")) achievementIDs.push("IXlo9YNPQxb0EkpdxNP4");

  if (achievementIDs.length === 0) return [[], []];
  //  BUSCAR AS CONQUISTAS EXISTENTS NO ARRAY
  const achievementRef = collection(db, "achievements");
  const q = query(achievementRef, where(documentId(), "in", achievementIDs));
  const achievementList: Partial<AchievementProps>[] = await getDocs(q)
    .then(result => result.docs.map(item => ({ id: item.id, ...item.data() })))
    .catch(e => {
      console.error("Ocorreu um erro: " + e);
      return [];
    });

  return [achievementIDs, achievementList];
};

const randomFigure = async (galery: Partial<FigureProps>[]) => {
  const figuresRef = collection(db, "figures");
  const q = galery.length ? query(figuresRef, where(documentId(), "not-in", galery)) : figuresRef;
  const galeryList: Partial<FigureProps>[] = await getDocs(q)
    .then(result => result.docs.map(item => ({ id: item.id, ...item.data() } as Partial<FigureProps>)))
    .catch(e => {
      console.error("Ocorreu um erro: " + e);
      return [];
    });

  if (galeryList.length) {
    const randomValue = Math.floor(Math.random() * galeryList.length);
    const figureSelected = galeryList[randomValue];

    return figureSelected;
  }
};

export default function SectionResolving() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const __pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [percentSection, setPercentSection] = useState(0);
  const { color, icon, section } = useLocalSearchParams<Partial<SectionResolvingProps>>();
  const { session, setSession, checkLevel, setCollection, setAchievements, setEarnings, setIsLoading } = useContext(AppContext);

  const mainSection: Section = JSON.parse(section!);
  const qtdQuestions = mainSection?.questions?.length;

  const { control, handleSubmit, formState: { errors } } = useForm<QuestionOBJ>({
    defaultValues: Object.assign<QuestionOBJ, QuestionOBJ[]>({}, new Array(qtdQuestions)),
  });

  const levelBase = {
    wisdomLevel: mainSection?.xpType === 2 ? mainSection?.experience : 0,
    professionalismLevel: mainSection?.xpType === 1 ? mainSection?.experience : 0,
    experienceLevel: (mainSection?.experience * 0.10) + (mainSection?.xpType ? 0 : mainSection?.experience),
  };

  const onSubmit = async (data: QuestionOBJ) => {
    if (currentPage === qtdQuestions) return router.push("/home");

    if (currentPage === qtdQuestions! - 1) {
      setIsLoading(true);

      // ENVIANDO AS RESPOSTAS
      const sectionRef = doc(db, "sections", mainSection.id);
      await updateDoc(sectionRef, { answers: arrayUnion({ ...data, user: session?.id }) })
        .then(async () => {

          const userRef = doc(db, "users", session!.id!);

          // VERIFICAR SE VAI GANHAR ALGUMA CONQUISTA
          const [achievementIDs, achievementList] = await checkAchievement(session as Partial<User>, checkLevel);

          // RANDOMIZAR SE VAI GANHAR FIRUGA OU NÃO
          const figureEarned = await randomFigure(session!.collection as Partial<FigureProps>[]);

          if (achievementList.length || figureEarned) {

            achievementList.length && setAchievements(prev => [...new Set([...prev, ...achievementList])]);
            figureEarned && setCollection(prev => [...new Set([...prev, figureEarned])] as Partial<FigureProps>[]);

            setEarnings({
              type: "ACHIEVEMENT",
              title: "Você Desbloqueou algumas conquistas! Verifique seu perfil!",
            });
          }

          // ATUALIZANDO COM AS MUDANÇAS
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

              achievements: [...new Set([...session!.achievements, ...achievementIDs])],

              collection: figureEarned ? [...new Set([...session!.collection, figureEarned.id])] : session!.collection,
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
            },

            achievements: [...new Set([...session!.achievements, ...achievementIDs])],

            collection: (figureEarned ? [...new Set([...session!.collection, figureEarned.id])] : session!.collection) as FigureProps[],
          };

          // ATUALIZANDO O USER DO STORAGE E DO CONTEXTO
          await AsyncStorage.setItem("syncs_user", JSON.stringify({ ...userBody }))
            .then(() => {
              setSession(userBody as User);
              return __pagerRef.current?.setPage(currentPage + 1);
            })
            .catch((error) => console.error("Error no storage", error));
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
        // scrollEnabled={false}
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
          <Text fs={25} fw="BOLD" ta="center">
            {`Parabéns\n ${session?.nickname.split(" ")[0]}!`}
          </Text>

          <Image
            source={require("../../../assets/images/Success.png")}
            style={{ marginTop: 15, width: width / 1.7, height: width / 1.7 }}
          />

          <Text
            fs={16}
            fw="BOLD"
            ta="center"
            style={{ marginVertical: 20, marginHorizontal: 30 }}
          >
            {`Perfeito! ${session?.nickname.split(" ")[0]} \nVocê concluiu esta bateria de perguntas, veja suas reconpensas e aguarde por novos desafios!`}
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