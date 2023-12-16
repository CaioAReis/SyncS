import { useContext } from "react";
import { Link, router } from "expo-router";
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Text } from "../components";
import { AchievementProps, FigureProps, SignInData, User } from "../types";
import { useAppTheme } from "../theme";
import { auth, db } from "../services/firebaseConfig";
import { regexValidations } from "../utils/regexValidations";
import AppContext from "../services/AppContext";

export default function SignIn() {
  const { colors } = useAppTheme();
  const { isLoading, setIsLoading, setAchievements, setCollection, setSession } = useContext(AppContext);

  const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInData) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then(async (userCredential) => {
        const userSigned = userCredential.user;

        const userRef = doc(db, "users", userSigned?.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          //  BUSCAR A LISTA DE COLEÇÃO E DE CONQUISTAS E SALVAR NOS CAMPOS DO USUÁRIO

          if (userSnap.data().achievements.length > 0) {
            const achievementRef = collection(db, "achievements");
            const q = query(achievementRef, where(documentId(), "in", userSnap.data().achievements));
            const achievementList: Partial<AchievementProps>[] = await getDocs(q)
              .then(result => result.docs.map(item => ({ id: item.id, ...item.data() })))
              .catch(e => {
                console.error("Ocorreu um erro: " + e);
                return [];
              });

            setAchievements(achievementList);
          }

          if (userSnap.data().collection.length > 0) {
            const figuresRef = collection(db, "figures");
            const q = query(figuresRef, where(documentId(), "in", userSnap.data().collection));
            const figuresList: Partial<FigureProps>[] = await getDocs(q)
              .then(result => result.docs.map(item => ({ id: item.id, ...item.data() })))
              .catch(e => {
                console.error("Ocorreu um erro: " + e);
                return [];
              });

            setCollection(figuresList);
          }

          const jsonUser = JSON.stringify({ id: userSnap.id, ...userSnap.data() });
          await AsyncStorage.setItem("syncs_user", jsonUser)
            .then(() => {
              setSession({ id: userSnap.id, ...userSnap.data() } as User);
              router.push("/home");
            })
            .catch((error) => console.error("Error no storage", error));

        } else {
          alert("Usuário não encontrado!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);

        alert("Email ou senha inválido. Tente novamente!");
        // onToggleToast({
        //   type: "error",
        //   message: "Email ou senha inválido. Tente novamente!",
        // });

      }).finally(() => setIsLoading(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
      behavior={Platform.select({ ios: "padding" })}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 40 }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />

          <Text fw="BOLD" fs={25} style={{ marginVertical: 30 }}>Faça seu Login</Text>

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Informe um email",
              pattern: { value: regexValidations.EMAIL, message: "Email inválido." }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                value={value}
                mode="outlined"
                onBlur={onBlur}
                autoComplete="email"
                onChangeText={onChange}
                keyboardType="email-address"
                error={Boolean(errors.email)}
                outlineColor={colors.background7}
                style={{ marginTop: 10, backgroundColor: colors.background2 }}
                left={<TextInput.Icon icon="email-outline" color={errors.email ? colors.error : colors.primary9} />}
              />
            )}
          />
          {errors.email && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.email.message}
            </Text>
          )}

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Informe uma senha",
              minLength: { value: 8, message: "A senha precisa ter mais que 8 caracteres" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Senha"
                value={value}
                secureTextEntry
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                error={Boolean(errors.password)}
                outlineColor={colors.background7}
                style={{ marginTop: 10, backgroundColor: colors.background2 }}
                left={<TextInput.Icon icon="lock-outline" color={errors.password ? colors.error : colors.primary9} />}

              />
            )}
          />
          {errors.password && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.password.message}
            </Text>
          )}

          <Link href="/recoverPass" style={{ marginVertical: 8, alignSelf: "flex-end" }}>
            <Text fs={14} style={{ textDecorationLine: "underline", color: colors.blue5 }}>
              Esqueçeu a senha?
            </Text>
          </Link>

          <Button
            icon="login"
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
            style={{ marginVertical: 40 }}
            onPress={handleSubmit(onSubmit)}
          >
            ENTRAR
          </Button>

          <Text fs={14} ta="center">
            {"Não possui conta? "}
            <Link href="/signUp">
              <Text fs={14} style={{ textDecorationLine: "underline", color: colors.blue5 }}>
                Cadastre-se
              </Text>
            </Link>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
