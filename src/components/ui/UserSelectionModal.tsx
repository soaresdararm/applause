import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { User } from "../../types";
import { Avatar } from "./Avatar";

interface UserSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  users: User[];
  selectedUsers: User[];
  onConfirm: (users: User[]) => void;
}

export const UserSelectionModal: React.FC<UserSelectionModalProps> = ({
  visible,
  onClose,
  users,
  selectedUsers,
  onConfirm,
}) => {
  const [searchText, setSearchText] = useState("");
  const [localSelectedUsers, setLocalSelectedUsers] =
    useState<User[]>(selectedUsers);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleUserSelection = (user: User) => {
    const isSelected = localSelectedUsers.some((u) => u.id === user.id);
    if (isSelected) {
      setLocalSelectedUsers(localSelectedUsers.filter((u) => u.id !== user.id));
    } else {
      setLocalSelectedUsers([...localSelectedUsers, user]);
    }
  };

  const handleConfirm = () => {
    onConfirm(localSelectedUsers);
    setSearchText("");
  };

  const handleCancel = () => {
    setLocalSelectedUsers(selectedUsers);
    setSearchText("");
    onClose();
  };

  const isUserSelected = (user: User) => {
    return localSelectedUsers.some((u) => u.id === user.id);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    const selected = isUserSelected(item);

    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => toggleUserSelection(item)}
      >
        <Avatar uri={item.avatar} size={40} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Para quem?</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.selectText}>Selecionar</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar"
              placeholderTextColor="#8E8E93"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Users List */}
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            style={styles.usersList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  cancelText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  selectText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  usersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: "#8E8E93",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
