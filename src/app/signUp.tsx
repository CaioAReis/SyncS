import { useContext } from "react";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Text } from "../components";
import { useAppTheme } from "../theme";
import { SignUpData, User } from "../types";
import AppContext from "../services/AppContext";
import { auth, db } from "../services/firebaseConfig";
import { regexValidations } from "../utils/regexValidations";

export default function SignUp() {
  const { colors } = useAppTheme();
  const { setSession } = useContext(AppContext);
  const { isLoading, setIsLoading } = useContext(AppContext);

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<SignUpData>({
    defaultValues: {
      name: "",
      email: "",
      nickname: "",
      password: "",
      confirmPass: "",
    },
  });

  const onSubmit = (data: SignUpData) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data?.email, data?.password)
      .then(async (userCredential) => {
        const userSignUped = userCredential.user;

        const userBody: Partial<User> = {
          phone: "",
          birthDate: "",
          accountStatus: "",
          name: data.name,
          email: data.email,
          nickname: data.nickname,
          picture: `https://api.dicebear.com/7.x/thumbs/png?seed=${data.nickname}&eyes=variant4W16`,

          collection: [],
          achievements: [],

          wisdomLevel: 0,
          experienceLevel: 0,
          professionalismLevel: 0,

          solvedModules: {
            job: 0,
            user: 0,
            total: 0,
            doubts: 0,
            carrer: 0,
            several: 0,
            academic: 0,
            evolution: 0,
            recommendation: 0,
          },

          solvedQuestions: {
            job: 0,
            user: 0,
            total: 0,
            carrer: 0,
            doubts: 0,
            several: 0,
            academic: 0,
            evolution: 0,
            recommendation: 0,
          },

          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        };

        await setDoc(doc(db, "users", userSignUped.uid), userBody)
          .then(async () => {

            const jsonUser = JSON.stringify({ id: userSignUped.uid, ...userBody });
            await AsyncStorage.setItem("syncs_user", jsonUser)
              .then(() => {
                alert("Conta Criada com sucesso");
                setSession({ id: userSignUped.uid, ...userBody } as User);
                router.push("/home");
              })
              .catch((error) => console.error("Error no storage", error));
          }).finally(() => setIsLoading(false));
      })
      .catch((error) => console.error(error.code, error.message));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
      behavior={Platform.select({ ios: "padding" })}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 60 }}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />

          <Text fw="BOLD" fs={25} style={{ marginVertical: 30 }}>Crie sua conta</Text>

          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nome é obrigatório",
              pattern: { value: regexValidations.NAME, message: "Nome inválido" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome"
                value={value}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                error={Boolean(errors.name)}
                outlineColor={colors.background7}
                style={{ backgroundColor: colors.background2 }}
                left={<TextInput.Icon icon="account-outline" color={errors.name ? colors.error : colors.primary9} />}
              />
            )}
          />
          {errors.name && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.name.message}
            </Text>
          )}

          <Controller
            name="nickname"
            control={control}
            rules={{
              required: "Nome é obrigatório",
              pattern: { value: regexValidations.NAME, message: "Nome inválido" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                mode="outlined"
                onBlur={onBlur}
                label="Nome de usuário"
                onChangeText={onChange}
                error={Boolean(errors.nickname)}
                outlineColor={colors.background7}
                style={{ marginTop: 10, backgroundColor: colors.background2 }}
                left={<TextInput.Icon icon="account-box-outline" color={errors.nickname ? colors.error : colors.primary9} />}
              />
            )}
          />
          {errors.nickname && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.nickname.message}
            </Text>
          )}

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email é obrigatório",
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
                left={<TextInput.Icon icon="email-outline" color={errors.name ? colors.error : colors.primary9} />}
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
              required: "A senha é obrigatória",
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
                left={<TextInput.Icon icon="lock-outline" color={errors.name ? colors.error : colors.primary9} />}
              />
            )}
          />
          {errors.password && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.password.message}
            </Text>
          )}

          <Controller
            control={control}
            name="confirmPass"
            rules={{
              required: "É necessário confirmar a senha",
              validate: {
                checkPass: v => {
                  if (v !== getValues("password")) return "As senhas não correspondem";
                }
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                secureTextEntry
                mode="outlined"
                onBlur={onBlur}
                label="Confirmar senha"
                onChangeText={onChange}
                outlineColor={colors.background7}
                error={Boolean(errors.confirmPass)}
                style={{ marginTop: 10, backgroundColor: colors.background2 }}
                left={<TextInput.Icon icon="lock-check-outline" color={errors.name ? colors.error : colors.primary9} />}
              />
            )}
          />
          {errors.confirmPass && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
              {errors.confirmPass.message}
            </Text>
          )}

          <Button
            mode="contained"
            icon="account-plus"
            loading={isLoading}
            disabled={isLoading}
            style={{ marginVertical: 40 }}
            onPress={handleSubmit(onSubmit)}
          >
            CRIAR CONTA
          </Button>

          <Text fs={14} ta="center">
            {"Já possui conta? Faça o "}
            <Link href="/signIn">
              <Text fs={14} style={{ textDecorationLine: "underline", color: colors.blue5 }}>
                Login
              </Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
