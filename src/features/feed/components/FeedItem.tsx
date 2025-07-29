import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "../../../components/ui/Avatar";
import { ApplausePost } from "../../../types";
import { formatRelativeTime } from "../../../utils";

interface FeedItemProps {
  post: ApplausePost;
  isFirst?: boolean;
  isLast?: boolean;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  post,
  isFirst,
  isLast,
}) => {
  const containerStyle = [
    styles.container,
    isFirst && styles.firstItem,
    isLast && styles.lastItem,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Avatar uri={post.author.avatar} size={40} />
        <View style={styles.headerText}>
          <Text style={styles.authorName}>
            {post.author.name} <Text style={styles.actionText}>recebeu um</Text>{" "}
            <Text style={styles.recognitionText}>
              {post.recognitionType.name.toLowerCase()}
            </Text>
          </Text>
          <Text style={styles.timestamp}>
            de {post.recipient.name} · {formatRelativeTime(post.createdAt)}
          </Text>
        </View>
      </View>

      <Text style={styles.message}>{post.message}</Text>
      <Text style={styles.hashtag}>#trabalhoequipe</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>👏</Text>
          <Text style={styles.actionCount}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  firstItem: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  lastItem: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    lineHeight: 20,
  },
  actionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  recognitionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
    marginBottom: 8,
  },
  hashtag: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  actionCount: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
