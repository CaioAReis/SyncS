import { Image, View } from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import { Text } from "../components";
import { useAppTheme } from "../theme";

interface SignUpData {
  name: string,
  email: string,
  password: string,
  confirmPass: string,
}

export default function SignUp() {
  const { colors } = useAppTheme();

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<SignUpData>({
    defaultValues: {
      name: "",
      email: "",
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

        <Controller
          name="name"
          control={control}
          rules={{ required: "Informe seu nome" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nome"
              value={value}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              error={Boolean(errors.name)}
              outlineColor={colors.suface}
              style={{ backgroundColor: colors.suface }}
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
              outlineColor={colors.suface}
              error={Boolean(errors.email)}
              style={{ marginTop: 10, backgroundColor: colors.suface }}
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
          rules={{ required: "Informe uma senha" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Senha"
              value={value}
              secureTextEntry
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              outlineColor={colors.suface}
              error={Boolean(errors.password)}
              style={{ marginTop: 10, backgroundColor: colors.suface }}
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
            required: "Confirme a senha",
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
              outlineColor={colors.suface}
              error={Boolean(errors.confirmPass)}
              style={{ marginTop: 10, backgroundColor: colors.suface }}
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
