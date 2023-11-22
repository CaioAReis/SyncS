import { Image, Pressable } from "react-native";
import { useAppTheme } from "../theme";


interface CollectionItemProps {
  size: number,
  image: string,
  onPress?: () => void,
}

export function CollectionItem({ image, size, onPress }: CollectionItemProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          backgroundColor: colors.background5
        }}
      />
    </Pressable>
  );
}