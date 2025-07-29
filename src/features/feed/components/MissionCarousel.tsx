import { Avatar } from "@/src/components/ui/Avatar";
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
  const firstMission = missions[0];

  if (!firstMission) return null;

  return (
    <View style={styles.container}>
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
            {mission.post && (
              <View style={styles.postContent}>
                <View style={styles.postHeader}>
                  <Avatar uri={mission.post.author.avatar} size={32} />
                  <View style={styles.postInfo}>
                    <Text style={styles.authorName}>
                      {mission.post.author.name}
                    </Text>
                    <Text style={styles.timeAgo}>{mission.post.timeAgo}</Text>
                  </View>
                </View>
                <Text style={styles.postAction}>{mission.post.action}</Text>
                <View style={styles.postActions}>
                  <Text style={styles.reactionsText}>👏 3</Text>
                  <Text style={styles.commentsText}>💬 3</Text>
                </View>
              </View>
            )}
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
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  missionImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,
  },
  postContent: {
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  postInfo: {
    marginLeft: 8,
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  timeAgo: {
    fontSize: 12,
    color: "#8E8E93",
  },
  postAction: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 12,
    lineHeight: 16,
  },
  postActions: {
    flexDirection: "row",
    gap: 16,
  },
  reactionsText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  commentsText: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
