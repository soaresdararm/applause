import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RecognitionType, User } from "../../types";
import { MessageModal } from "./MessageModal";
import { UserSelectionModal } from "./UserSelectionModal";

interface ApplauseModalProps {
  visible: boolean;
  onClose: () => void;
  users: User[];
  recognitionTypes: RecognitionType[];
  onSubmit: (data: {
    recipientIds: string[];
    recognitionTypeId: string;
    message: string;
  }) => void;
}

export const ApplauseModal: React.FC<ApplauseModalProps> = ({
  visible,
  onClose,
  users,
  recognitionTypes,
  onSubmit,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setSelectedUsers([]);
      setMessage("");
      setShowUserSelection(false);
      setShowMessageModal(false);
    }
  }, [visible]);

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
    setShowUserSelection(false);
  };

  const handleMessageUpdate = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleComplete = () => {
    if (selectedUsers.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos uma pessoa");
      return;
    }
    if (!message.trim()) {
      Alert.alert("Erro", "Digite uma mensagem");
      return;
    }

    // Use the first recognition type as default (Impressionante!)
    const defaultRecognitionType = recognitionTypes[0];

    onSubmit({
      recipientIds: selectedUsers.map((u) => u.id),
      recognitionTypeId: defaultRecognitionType?.id || "1",
      message: message.trim(),
    });

    // Reset form
    setSelectedUsers([]);
    setMessage("");
  };

  const getSelectedUsersText = () => {
    if (selectedUsers.length === 0) return "";
    if (selectedUsers.length === 1) return selectedUsers[0].name;
    return `${selectedUsers[0].name} e +${selectedUsers.length - 1}`;
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.title}>Envie um Aplauso</Text>

            {/* Para quem? */}
            <TouchableOpacity
              style={styles.buttonRow}
              onPress={() => setShowUserSelection(true)}
            >
              <View style={styles.buttonHeader}>
                <Text style={styles.buttonLabel}>Para quem?</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
              <View style={styles.buttonContent}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedUsers.length > 0 && {
                      color: "#000",
                      fontWeight: "500",
                    },
                  ]}
                >
                  {selectedUsers.length > 0 ? getSelectedUsersText() : ""}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Mensagem */}
            <TouchableOpacity
              style={styles.buttonRow}
              onPress={() => setShowMessageModal(true)}
            >
              <View style={styles.buttonHeader}>
                <Text style={styles.buttonLabel}>Mensagem</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
              <View style={styles.buttonContent}>
                <Text
                  style={[
                    styles.buttonText,
                    message.trim() && { color: "#000", fontWeight: "500" },
                  ]}
                >
                  {message.trim() || ""}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Botão Completar */}
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
            >
              <Text style={styles.completeButtonText}>Completar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <UserSelectionModal
        visible={showUserSelection}
        onClose={() => setShowUserSelection(false)}
        users={users}
        selectedUsers={selectedUsers}
        onConfirm={handleUserSelection}
      />

      <MessageModal
        visible={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={message}
        onConfirm={handleMessageUpdate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 28,
    minHeight: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },
  inputContainer: {
    marginBottom: 24,
  },
  buttonRow: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 0,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E7",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  buttonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
  },
  inputText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  placeholder: {
    color: "#8E8E93",
  },
  arrow: {
    fontSize: 18,
    color: "#8E8E93",
  },
  typesContainer: {
    paddingVertical: 8,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  typeButtonSelected: {
    backgroundColor: "#007AFF",
  },
  typeEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  typeName: {
    fontSize: 14,
    color: "#000",
  },
  typeNameSelected: {
    color: "#FFFFFF",
  },
  messageInput: {
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "right",
    marginTop: 4,
  },
  completeButton: {
    backgroundColor: "#FFD60A",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
