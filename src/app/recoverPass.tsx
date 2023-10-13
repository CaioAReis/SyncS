import { useRef } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import PagerView from "react-native-pager-view";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, TextInput } from "react-native-paper";

import { useAppTheme } from "../theme";
import { Header, Text } from "../components";
import { regexValidations } from "../utils/regexValidations";

interface RecoverData {
  email: string,
}

export default function RecoverPass() {
  const { colors } = useAppTheme();
  const pagesRef = useRef<PagerView>(null);

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<RecoverData>({
    defaultValues: { email: "" },
  });

  const onSendEmail = (data: RecoverData) => {
    console.warn("Enviar email de redefinição para: " + data);
    pagesRef?.current?.setPage(1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <PagerView scrollEnabled={false} ref={pagesRef} style={{ flex: 1 }}>
        <View key={0} style={{ flex: 1 }}>
          <Avatar.Icon
            size={200}
            icon="lock-outline"
            color={colors.color10}
            style={{
              marginVertical: 40,
              alignSelf: "center",
              backgroundColor: colors.suface,
            }}
          />

          <Text fs={16} ta="center">
            {"Informe o email vinculado à sua conta \npara a redefinição da senha"}
          </Text>

          <Controller
            name="email"
            control={control}
            rules={{ 
              required: "Informe o email para redefinir a senha",
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
                style={{ marginHorizontal: 20, marginTop: 40, backgroundColor: colors.suface }}
                left={
                  <TextInput.Icon
                    icon="email-outline"
                    color={errors.email ? colors.error : colors.primary9}
                  />
                }
              />
            )}
          />
          {errors.email && (
            <Text fs={12} fw="SEMIB" style={{ marginLeft: 30, color: colors.error }}>
              {errors.email.message}
            </Text>
          )}

          <Button
            mode="contained"
            icon="email-send-outline"
            onPress={handleSubmit(onSendEmail)}
            style={{ marginVertical: 50, marginHorizontal: 20 }}
          >
            ENVIAR
          </Button>
        </View>

        <View key={1} style={{ flex: 1 }}>
          <Avatar.Icon
            size={200}
            color={colors.color10}
            icon="email-alert-outline"
            style={{
              marginVertical: 40,
              alignSelf: "center",
              backgroundColor: colors.suface,
            }}
          />

          <Text fs={16} ta="center">
            {"Enviamos um link de \nalteração de senha para o email: \n" + getValues("email")}
          </Text>

          <Button
            mode="contained"
            icon="arrow-left"
            onPress={() => router.back()}
            style={{ marginVertical: 60, marginHorizontal: 20 }}
          >
            VOLTAR AO LOGIN
          </Button>
        </View>
      </PagerView>
    </View>
  );
}
