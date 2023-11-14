import { Link } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, IconButton, List, Switch, TouchableRipple } from "react-native-paper";

import { useAppTheme } from "../../theme";
import { AboutButton, DeleteAccountButton, Header, LogoutButton, Text } from "../../components";

export default function ProfileSettings() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        <Header title="Perfil" />

        <View style={styles.avatarView}>
          <Avatar.Image
            size={90}
            source={{ uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=Aneka" }}
          />

          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text fw="SEMIB" fs={18} lh={24}>Caio Almeida</Text>

            <Link href={"stack/editProfile"} asChild>
              <TouchableRipple
                rippleColor={colors.blue}
                style={{ marginTop: 4, flexDirection: "row", alignItems: "center" }}
              >
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

        <View style={{ marginHorizontal: 20 }}>

          <List.Section style={{ marginBottom: 60 }}>
            <List.Subheader>Definições</List.Subheader>

            <List.Item
              title="Receber notificações"
              onPress={() => { }}
              rippleColor={colors.blue11}
              style={{ marginBottom: 10 }}
              left={props => <List.Icon {...props} icon="bell-outline" />}
              right={props => (
                <Switch
                  {...props}
                  value={true}
                  color={colors.green}
                  onValueChange={() => { }}
                  style={{ height: 20, borderBlockColor: "red" }}
                />
              )}

            />

            <List.Item
              onPress={() => { }}
              title="Compartilhar"
              style={{ marginBottom: 10 }}
              rippleColor={colors.yellow11}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    Platform.select({
                      android: "share-variant-outline",
                      ios: "tray-arrow-up"
                    }) || "share-variant-outline"
                  }
                />
              )}
            />

            <AboutButton />

            <LogoutButton />

            <View style={{ alignItems: "center", marginVertical: 50 }}>
              <Image
                source={require("../../../assets/images/Logo.png")}
                style={{
                  width: 90,
                  height: 90,
                }}
              />

              <Text fs={14} style={{ marginTop: 10 }}>Versão: {"1.0.0"}</Text>
            </View>

            <DeleteAccountButton />

          </List.Section>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  avatarView: {
    marginVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  }

});