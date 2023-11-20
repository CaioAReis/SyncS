import { Image, Pressable } from "react-native";
import { useAppTheme } from "../theme";


interface CollectionItemProps {
  size: number,
  image: string,
  action?: () => void,
}

export function CollectionItem({ image, size, action }: CollectionItemProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable onPress={action}>
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