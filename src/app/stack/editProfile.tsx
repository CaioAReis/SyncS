import { router } from "expo-router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

import { User } from "../../types";
import { useAppTheme } from "../../theme";
import { Header, Text } from "../../components";
import { db } from "../../services/firebaseConfig";
import AppContext from "../../services/AppContext";
import { doc, updateDoc } from "firebase/firestore";
import { masks, regexValidations } from "../../utils/regexValidations";

export default function EditProfile() {
  const { colors } = useAppTheme();
  const { session, setSession } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<Partial<User>>({
    defaultValues: {
      name: session?.name,
      email: session?.email,
      phone: session?.phone,
      picture: session?.picture,
      nickname: session?.nickname,
      birthDate: session?.birthDate,
    },
  });

  const onSubmit = async (data: Partial<User>) => {
    setIsLoading(true);

    const userRef = doc(db, "users", session!.id);
    await updateDoc(userRef, { ...data }).then(() => {

      const jsonUser = JSON.stringify({ ...session, ...data });
      AsyncStorage.setItem("syncs_user", jsonUser)
        .then(() => {
          setSession({ ...session!, ...data });
          alert("Dados atualizados com Sucesso!");
          router.back();
        });

    })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
      behavior={Platform.select({ ios: "padding" })}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView>
          <Header title="Editar Perfil" />

          <View style={{ ...styles.container, backgroundColor: colors.color12 }}>
            <View style={{ alignItems: "center" }}>
              <Avatar.Image
                size={120}
                style={{ bottom: 30 }}
                source={{ uri: session?.picture }}
              />
            </View>

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
                  left={(
                    <TextInput.Icon
                      icon="account-outline"
                      color={errors.name ? colors.error : colors.primary9}
                    />
                  )}
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
                required: "Nome de usuário é obrigatório",
                pattern: { value: regexValidations.NAME, message: "Nome inválido" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  label="Nome de usuário"
                  onChangeText={onChange}
                  style={{ marginTop: 10 }}
                  error={Boolean(errors.nickname)}
                  outlineColor={colors.background7}
                  left={(
                    <TextInput.Icon
                      icon="account-box-outline"
                      color={errors.nickname ? colors.error : colors.primary9}
                    />
                  )}
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
                  style={{ marginTop: 10 }}
                  keyboardType="email-address"
                  error={Boolean(errors.email)}
                  outlineColor={colors.background7}
                  left={(
                    <TextInput.Icon
                      icon="email-outline"
                      color={errors.name ? colors.error : colors.primary9}
                    />
                  )}
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
                pattern: { value: regexValidations.PHONE, message: "Telefone inválido" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  maxLength={15}
                  mode="outlined"
                  onBlur={onBlur}
                  label="Telefone"
                  autoComplete="tel"
                  keyboardType="numeric"
                  style={{ marginTop: 10 }}
                  placeholder="DDD + número"
                  error={Boolean(errors.phone)}
                  outlineColor={colors.background7}
                  onChangeText={e => onChange(masks.phone(e))}
                  left={(
                    <TextInput.Icon
                      icon="phone-dial-outline"
                      color={errors.phone ? colors.error : colors.primary9}
                    />
                  )}
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
                pattern: { value: regexValidations.DATE, message: "Data inválida" },
                minLength: { value: 10, message: "Data inválida, preencha corretamente." },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  onBlur={onBlur}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  style={{ marginTop: 10 }}
                  label="Data de Nascimento"
                  value={masks.date(value ?? "")}
                  outlineColor={colors.background7}
                  error={Boolean(errors.birthDate)}
                  left={(
                    <TextInput.Icon
                      icon="calendar"
                      color={errors.birthDate ? colors.error : colors.primary9}
                    />
                  )}
                />
              )}
            />
            {errors.birthDate && (
              <Text fs={12} fw="SEMIB" style={{ marginLeft: 10, color: colors.error }}>
                {errors.birthDate.message}
              </Text>
            )}
          </View>

          <Button
            mode="contained"
            icon="account-plus"
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            style={{ marginVertical: 40, marginHorizontal: 20 }}
          >
            SALVAR ALTERAÇÕES
          </Button>
        </ScrollView>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 60,
    borderRadius: 10,
    paddingBottom: 30,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  }

});