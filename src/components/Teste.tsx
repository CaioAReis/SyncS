import { useAppTheme } from "../theme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";

export function Teste() {
  const { colors } = useAppTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.pink }}>
   
      <Title style={{ fontSize: 40 }}>ASIUHDIUASHDI</Title>
      <Text style={{ fontSize: 40 }}>ASIUHDIUASHDI</Text>
      <Text variant="titleMedium" style={{ fontSize: 40, lineHeight: 50 }}>ASIUHDIUASHDI</Text>
      <Button buttonColor={colors.primary} mode="contained" >AISUDIAUHS</Button>

      <StatusBar
        style={"auto"}
        backgroundColor={colors?.pink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center", justifyContent: "center", flex: 1,
  }
});

