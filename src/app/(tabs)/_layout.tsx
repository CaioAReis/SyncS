import { Tabs } from "expo-router";
import { useAppTheme } from "../../theme";
import { TabButton } from "../../components";

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
        tabBarInactiveTintColor: colors.primary10,

        tabBarStyle: {
          elevation: 0,
          paddingHorizontal: 6,
          borderColor: colors.background,
          backgroundColor: colors.background,
        },

        tabBarLabel: () => null,
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ focused }) => (
            <TabButton
              label="Início"
              focused={focused}
              bg={colors.blue12}
              color={colors.blue5}
              icon="home-variant-outline"
            />
          )
        }}
      />

      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
          tabBarIcon: ({ focused }) => (
            <TabButton
              label="Timeline"
              focused={focused}
              bg={colors.green12}
              color={colors.green5}
              icon="clock-check-outline"
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabButton
              label="Perfil"
              focused={focused}
              bg={colors.red12}
              color={colors.red5}
              icon="account-outline"
            />
          )
        }}
      />

    </Tabs>
  );
}