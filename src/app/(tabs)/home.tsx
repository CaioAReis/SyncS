import { View } from "react-native";
import { Text } from "../../components";
import { useAppTheme } from "../../theme";

export default function Home() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>

      <Text fw="BOLD">TELA DE HOME</Text>

    </View>
  );
}