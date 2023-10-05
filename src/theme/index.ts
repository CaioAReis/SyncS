import { dark } from "./dark";
import { light } from "./light";
import { useTheme } from "react-native-paper";

export const theme = {

  dark: dark,
  light: light,

};

export type AppTheme = typeof light;
export const useAppTheme = () => useTheme<AppTheme>();
