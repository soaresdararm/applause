import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  uri: string;
  size?: number;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 40, onPress }) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      style={[styles.container, { width: size, height: size }]}
    >
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        contentFit="cover"
        placeholder={{ blurhash: "LHFFaXYk^6#M@-5c,1J5@[or[Q6." }}
        transition={200}
      />
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    backgroundColor: "#f0f0f0",
  },
});
