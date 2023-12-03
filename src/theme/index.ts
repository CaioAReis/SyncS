import { dark } from "./dark";
import { light } from "./light";
import { useTheme } from "react-native-paper";

export const theme: {[index: string]: any} = { // eslint-disable-line @typescript-eslint/no-explicit-any

  dark: dark,
  light: light,

};

export type AppTheme = typeof light;
export const useAppTheme = () => useTheme<AppTheme>();
