import { Tabs } from "expo-router";
import { useAppTheme } from "../../theme";
import { Text } from "../../components";

export default function TabsApp() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      backBehavior="none"
      initialRouteName="home"
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "beside-icon",
        tabBarInactiveTintColor: colors.primary10,

        tabBarItemStyle: { borderWidth: 1, borderRadius: 80 },

        tabBarStyle: {
          elevation: 0,
          borderColor: colors.background,
          backgroundColor: colors.background,
        },

        tabBarLabel: ({ children, focused }) => (
          <Text fw="BOLD" fs={14}>{focused ? children : null}</Text>
        )
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarItemStyle: { backgroundColor: "red" },
          // tabBarIcon: ({ size, color, focused }) => (<></>)
        }}
      />

      <Tabs.Screen
        name="timeline"
        options={{ title: "Timeline" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: "Perfil" }}
      />

    </Tabs>
  );
}