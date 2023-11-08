import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import { Text } from "../components";
import { useAppTheme } from "../theme";
import { regexValidations } from "../utils/regexValidations";

interface SignUpData {
  name: string,
  email: string,
  nickname: string,
  password: string,
  confirmPass: string,
}

export default function SignUp() {
  const { colors } = useAppTheme();

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
    console.warn(data);
    router.push("/home");
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <View>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ width: 120, height: 120, alignSelf: "center" }}
        />

        <Text fw="BOLD" fs={25} style={{ marginVertical: 30 }}>Crie sua conta</Text>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
            style={{ marginVertical: 40 }}
            onPress={handleSubmit(onSubmit)}
          >
            CRIAR CONTA
          </Button>
        </KeyboardAvoidingView>

        <Text fs={14} ta="center">
          {"Já possui conta? Faça o "}
          <Link href="/signIn">
            <Text fs={14} style={{ textDecorationLine: "underline", color: colors.blue5 }}>
              Login
            </Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
