import { Image, View } from "react-native";

import { Text } from "../components";

export default function WelcomePage() {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Image
        style={{ width: 150, height: 150, marginBottom: 90 }}
        source={require("../../assets/images/Logo.png")}
      />

      <Text fs={40}>Welcome screen</Text>

    </View>
  );
}