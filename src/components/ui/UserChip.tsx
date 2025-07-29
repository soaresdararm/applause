import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../../types";
import { Avatar } from "./Avatar";

interface UserChipProps {
  user: User;
  onRemove?: () => void;
  showRemove?: boolean;
}

export const UserChip: React.FC<UserChipProps> = ({
  user,
  onRemove,
  showRemove = true,
}) => {
  return (
    <View style={styles.container}>
      <Avatar uri={user.avatar} size={24} />
      <Text style={styles.name} numberOfLines={1}>
        {user.name}
      </Text>
      {showRemove && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    maxWidth: 200,
  },
  name: {
    marginLeft: 6,
    marginRight: 4,
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#8E8E93",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  removeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
});
