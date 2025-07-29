import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BottomMissionCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.icon}>👏</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.points}>+ 455</Text>
          <Text style={styles.title}>Missão: Ativação de PDV</Text>
          <Text style={styles.subtitle}>
            Cumprida por 16 pessoas · 8 de novembro
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFD60A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  points: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD60A",
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
