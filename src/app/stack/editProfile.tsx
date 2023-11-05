import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, TextInput } from "react-native-paper";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { useAppTheme } from "../../theme";
import { Header, Text } from "../../components";
import { regexValidations } from "../../utils/regexValidations";

interface UserData {
  name: string,
  email: string,
  phone: string,
  nickname: string,
  birthDate: string,
}

export default function EditProfile() {
  const { colors } = useAppTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<UserData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nickname: "",
      birthDate: "",
    },
  });

  const onSubmit = (data: UserData) => {
    console.warn(data);
    // router.push("/home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <Header title="Editar Perfil" />

        <View style={{ marginTop: 60, paddingBottom: 30, paddingHorizontal: 10, borderRadius: 10, backgroundColor: colors.background4, marginHorizontal: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image
              size={120}
              style={{ bottom: 30 }}
              source={{ uri: "https://api.dicebear.com/7.x/thumbs/svg?seed=Felix" }}
            />
          </View>

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
                  outlineColor={colors.suface}
                  error={Boolean(errors.nickname)}
                  style={{ marginTop: 10, backgroundColor: colors.suface }}
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
              name="phone"
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
                  label="Telefone"
                  onChangeText={onChange}
                  outlineColor={colors.suface}
                  error={Boolean(errors.phone)}
                  style={{ marginTop: 10, backgroundColor: colors.suface }}
                  left={<TextInput.Icon icon="phone-dial-outline" color={errors.phone ? colors.error : colors.primary9} />}
                />
              )}
            />
            {errors.phone && (
              <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
                {errors.phone.message}
              </Text>
            )}

            <Controller
              name="birthDate"
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
                  onChangeText={onChange}
                  label="Data de Nascimento"
                  outlineColor={colors.suface}
                  error={Boolean(errors.birthDate)}
                  style={{ marginTop: 10, backgroundColor: colors.suface }}
                  left={<TextInput.Icon icon="calendar" color={errors.birthDate ? colors.error : colors.primary9} />}
                />
              )}
            />
            {errors.birthDate && (
              <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
                {errors.birthDate.message}
              </Text>
            )}
          </KeyboardAvoidingView>
        </View>

        <Button
          mode="contained"
          icon="account-plus"
          onPress={handleSubmit(onSubmit)}
          style={{ marginVertical: 40, marginHorizontal: 20 }}
        >
          SALVAR ALTERAÇÕES
        </Button>
      </ScrollView>
    </View>
  );
}