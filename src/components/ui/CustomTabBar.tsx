import React from "react";
import { StyleSheet, View } from "react-native";

export const CustomTabBarBackground: React.FC = () => {
  return <View style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F2EFE0",
    borderCurve: "continuous",
  },
});
