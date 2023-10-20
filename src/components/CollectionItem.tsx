import { Image } from "react-native";
import { useAppTheme } from "../theme";


interface CollectionItemProps {
  size: number,
  image: string,
}

export function CollectionItem({ image, size }: CollectionItemProps) {
  const { colors } = useAppTheme();

  return (
    <Image
      source={{ uri: image }}
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor: colors.background5
      }}
    />
  );
}