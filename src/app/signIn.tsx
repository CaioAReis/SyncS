import { Image, View } from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import { Text } from "../components";
import { useAppTheme } from "../theme";

interface SignInData {
  email: string,
  password: string,
}

export default function SignIn() {
  const { dark, colors } = useAppTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInData) => {
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

        <Text fw="BOLD" fs={25} style={{ marginVertical: 30 }}>Faça seu Login</Text>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Informe um email" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              value={value}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              error={Boolean(errors.email)}
              outlineColor={dark ? colors.background7 : colors.background1}
              style={{ marginTop: 10, backgroundColor: dark ? colors.background7 : colors.background1 }}
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
          rules={{ required: "Informe uma senha" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Senha"
              value={value}
              secureTextEntry
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              error={Boolean(errors.password)}
              outlineColor={dark ? colors.background7 : colors.background1}
              style={{ marginTop: 10, backgroundColor: dark ? colors.background7 : colors.background1 }}
              left={<TextInput.Icon icon="lock-outline" color={errors.password ? colors.error : colors.primary9} />}
            
            />
          )}
        />
        {errors.password && (
          <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
            {errors.password.message}
          </Text>
        )}

        <Link href="/" style={{ marginVertical: 8, alignSelf: "flex-end" }}>
          <Text fs={14} style={{ textDecorationLine: "underline", color: colors.blue5 }}>
            Esqueçeu a senha?
          </Text>
        </Link>

        <Button
          icon="login"
          mode="contained"
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
    </View>
  );
}
