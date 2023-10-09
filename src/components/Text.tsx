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

  fw?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",
  fontWeight?: "LIGHT" | "REGULAR" | "MEDIUM" | "SEMIB" | "BOLD",

  ta?: "center" | "auto" | "left" | "right" | "justify" | undefined,
  textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined,

  style?: TextStyle
}

export function Text({
  style,
  children,
  fs, fontSize,
  ta, textAlign,
  fw, fontWeight,
  lh, lineHeight,
}: TextProps) {

  return (
    <PaperText
      style={{
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