import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export function Teste() {
  const { colors } = useTheme();

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>ASIUHDIUASHDI</Text>
      <Button buttonColor={colors.purple5} mode="contained" >AISUDIAUHS</Button>
    </View>
  );
}