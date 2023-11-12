import React from "react";
import { TextStyle } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { useAppTheme } from "../theme";

export enum FontWeight {
  LIGHT = "Nunito_300Light",
  REGULAR = "Nunito_400Regular",
  MEDIUM = "Nunito_500Medium",
  SEMIB = "Nunito_600SemiBold",
  BOLD = "Nunito_700Bold",
}

interface TextProps {
  children?: React.ReactNode,

  color?: string,

  fs?: number,
  fontSize?: number,

  lh?: number,
  lineHeight?: number,

  fw?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",
  fontWeight?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",

  ta?: "center" | "auto" | "left" | "right" | "justify" | undefined,
  textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined,

  numberOfLines?: number | undefined,

  style?: TextStyle
}

export function Text({
  style,
  color,
  children,
  fs, fontSize,
  numberOfLines,
  ta, textAlign,
  fw, fontWeight,
  lh, lineHeight,
}: TextProps) {

  const { colors } = useAppTheme();

  return (
    <PaperText
      numberOfLines={numberOfLines}
      style={{
        color: color || colors.color,
        fontSize: fs || fontSize || 20,
        textAlign: ta || textAlign || "left",
        fontFamily: FontWeight[fw || fontWeight || "REGULAR"],
        lineHeight: lh || lineHeight || (fs || fontSize || 20) + 10,
        ...style
      }}
    >
      {children || ""}
    </PaperText>
  );
}