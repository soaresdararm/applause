import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "../ui/Avatar";

const { height: screenHeight } = Dimensions.get("window");

export const AppHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/admin-dropdown.png")}
            style={styles.adminImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.pointsCard}>
          <View style={styles.userInfo}>
            <Avatar
              uri="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              size={28}
            />
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsText}>450 pontos</Text>
              <Text style={styles.walletText}>ver carteira</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feedHeaderContainer}>
        <View style={styles.feedCard}>
          <Image
            source={require("../../../assets/images/aplausos.png")}
            style={styles.handImage}
          />
          <View style={styles.feedContent}>
            <Text style={styles.feedTitle}>
              Você recebeu um reconhecimento e conquistou uma experiência!
            </Text>
          </View>
          <TouchableOpacity style={styles.feedButton}>
            <Text style={styles.feedButtonText}>Resgatar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E2543",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 1,
    height: 700,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageContainer: {
    flex: 1,
  },
  adminImage: {
    width: 48,
    height: 48,
  },
  pointsCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 120,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsInfo: {
    marginLeft: 6,
    alignItems: "center",
  },
  pointsText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 15,
  },
  walletText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    lineHeight: 13,
  },
  notificationButton: {
    marginLeft: 6,
    padding: 2,
  },
  notificationIcon: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  feedHeaderContainer: {
    paddingBottom: 8,
  },
  feedCard: {
    backgroundColor: "#4ECDC4",
    borderRadius: 12,
    position: "relative",
    height: 120,
    overflow: "hidden",
  },
  handImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 140,
    height: 90,
  },
  feedContent: {
    position: "absolute",
    top: 16,
    left: 20,
    right: 60,
    zIndex: 2,
  },
  feedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
  },
  feedButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FFD60A",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  feedButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
