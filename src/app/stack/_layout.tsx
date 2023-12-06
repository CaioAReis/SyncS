import { Stack } from "expo-router";

export default function StackApp() {

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="profileSettings"
        options={{ title: "Configurações de perfil" }}
      />

      <Stack.Screen
        name="editProfile"
        options={{ title: "Editar perfil" }}
      />

      <Stack.Screen
        name="startQuestions"
        options={{ title: "Loob" }}
      />

      <Stack.Screen
        name="sectionResolving"
        options={{ title: "Perguntas" }}
      />

    </Stack>
  );
}