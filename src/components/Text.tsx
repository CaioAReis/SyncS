import React from "react";
import { TextStyle } from "react-native";
import { Text as PaperText } from "react-native-paper";

export enum FontWeight {
  LIGHT = "Nunito_300Light",
  REGULAR = "Nunito_400Regular",
  MEDIUM = "Nunito_500Medium",
  SEMIB = "Nunito_600SemiBold",
  BOLD = "Nunito_700Bold",
}

interface TextProps {
  children?: React.ReactNode,

  fs?: number,
  fontSize?: number,

  lh?: number,
  lineHeight?: number,

  fw?: FontWeight,
  fontWeight?: FontWeight,

  style?: TextStyle
}

export function Text({
  style,
  children,
  fs, fontSize,
  fw, fontWeight,
  lh, lineHeight,
}: TextProps) {

  return (
    <PaperText
      style={{
        fontSize: fs || fontSize || 20,
        fontFamily: fw || fontWeight || "Nunito_400Regular",
        lineHeight: lh || lineHeight || (fs || fontSize || 20) + 10,
        ...style
      }}
    >
      {children || ""}
    </PaperText>
  );
}