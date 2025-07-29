import { Mission } from "@/src/types";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MissionCarouselProps {
  missions: Mission[];
}

export const MissionCarousel: React.FC<MissionCarouselProps> = ({
  missions,
}) => {
  // Usar a primeira missão para o conteúdo fixo
  const firstMission = missions[0];

  if (!firstMission) return null;

  return (
    <View style={styles.container}>
      {/* Header fixo */}
      <View style={styles.missionTopRow}>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+ {firstMission.points}</Text>
          <Text style={styles.pointsIcon}>🏆</Text>
        </View>

        <View style={styles.missionContent}>
          <Text style={styles.missionTitle}>{firstMission.title}</Text>
          <Text style={styles.missionSubtitle}>
            cumprida por {firstMission.completedBy} pessoas •{" "}
            {firstMission.completedDate}
          </Text>
        </View>
      </View>

      {/* Carrossel só das imagens */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={280}
        snapToAlignment="start"
      >
        {missions.map((mission) => (
          <TouchableOpacity key={mission.id} style={styles.imageCard}>
            <Image
              source={{ uri: mission.image }}
              style={styles.missionImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  missionTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    paddingBottom: 12,
    gap: 6,
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    gap: 8,
  },
  pointsIcon: {
    fontSize: 10,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#121211",
  },
  missionContent: {
    flex: 1,
    justifyContent: "center",
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  missionSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 18,
  },
  imageCard: {
    width: 280,
    borderRadius: 12,
    overflow: "hidden",
  },
  missionImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
});
