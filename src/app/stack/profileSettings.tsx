import { View } from "react-native";
import { Header, Text } from "../../components";
import { useAppTheme } from "../../theme";
import { Avatar, IconButton, List, TouchableRipple } from "react-native-paper";
import { Link } from "expo-router";

export default function ProfileSettings() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Perfil" />

      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginVertical: 30, paddingHorizontal: 20 }}>
        <Avatar.Image
          size={90}
          source={{ uri: "https://api.dicebear.com/7.x/thumbs/svg?seed=Felix" }}
        />

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text fw="SEMIB" fs={18} lh={24}>Caio Almeida</Text>

          <Link href={"/home"} asChild>
            <TouchableRipple rippleColor={colors.blue} style={{ marginTop: 4, flexDirection: "row", alignItems: "center" }}>
              <>
                <List.Icon color={colors.color} icon="account-edit" style={{ marginRight: 8 }} />
                <Text fs={16} lh={20} style={{ textDecorationLine: "underline" }}>
                  Editar perfil
                </Text>
              </>
            </TouchableRipple>
          </Link>
        </View>

        <IconButton size={25} icon="moon-waning-crescent" />
      </View>

    </View>
  );
}