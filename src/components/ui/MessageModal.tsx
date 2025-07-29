import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  onConfirm: (message: string) => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  visible,
  onClose,
  message,
  onConfirm,
}) => {
  const [localMessage, setLocalMessage] = useState(message);

  const handleConfirm = () => {
    onConfirm(localMessage);
    onClose();
  };

  const handleCancel = () => {
    setLocalMessage(message);
    onClose();
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
            <Text style={styles.title}>Mensagem</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Escreva sua mensagem..."
              placeholderTextColor="#8E8E93"
              value={localMessage}
              onChangeText={setLocalMessage}
              multiline
              maxLength={500}
              autoFocus
            />
            <Text style={styles.charCount}>{localMessage.length}/500</Text>
          </View>
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
  confirmText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "right",
    marginTop: 8,
  },
});
