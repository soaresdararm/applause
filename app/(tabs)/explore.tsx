import { ApplauseForm } from "@/src/features/applause/components/ApplauseForm";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ApplauseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
