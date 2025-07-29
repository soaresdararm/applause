import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "../../../components/ui/Avatar";
import { Button } from "../../../components/ui/Button";
import { UserChip } from "../../../components/ui/UserChip";
import { useApplauseStore } from "../../../stores/applauseStore";
import { RecognitionType, User } from "../../../types";

interface ApplauseFormProps {
  onSuccess?: () => void;
}

export const ApplauseForm: React.FC<ApplauseFormProps> = ({ onSuccess }) => {
  const {
    users,
    usersLoading,
    recognitionTypes,
    recognitionTypesLoading,
    isSubmitting,
    submitError,
    loadUsers,
    loadRecognitionTypes,
    createApplause,
  } = useApplauseStore();

  const [selectedRecipient, setSelectedRecipient] = useState<User | null>(null);
  const [selectedRecognitionType, setSelectedRecognitionType] =
    useState<RecognitionType | null>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showRecognitionTypes, setShowRecognitionTypes] = useState(false);

  useEffect(() => {
    loadUsers("", true);
    loadRecognitionTypes();
  }, [loadUsers, loadRecognitionTypes]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.id !== selectedRecipient?.id
  );

  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    setShowUserDropdown(true);
    if (query.length > 0) {
      loadUsers(query, true);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedRecipient(user);
    setSearchQuery("");
    setShowUserDropdown(false);
  };

  const handleRemoveRecipient = () => {
    setSelectedRecipient(null);
  };

  const handleSelectRecognitionType = (type: RecognitionType) => {
    setSelectedRecognitionType(type);
    setShowRecognitionTypes(false);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!selectedRecipient) {
      Alert.alert("Erro", "Selecione um destinatário");
      return;
    }

    if (!selectedRecognitionType) {
      Alert.alert("Erro", "Selecione um tipo de reconhecimento");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Erro", "Digite uma mensagem");
      return;
    }

    try {
      await createApplause({
        recipientId: selectedRecipient.id,
        recognitionTypeId: selectedRecognitionType.id,
        message: message.trim(),
        image: selectedImage || undefined,
      });

      // Reset form
      setSelectedRecipient(null);
      setSelectedRecognitionType(null);
      setMessage("");
      setSelectedImage(null);
      setSearchQuery("");

      Alert.alert("Sucesso", "Aplauso enviado com sucesso!");
      onSuccess?.();
    } catch {
      Alert.alert("Erro", "Erro ao enviar aplauso");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Envie um Aplauso</Text>

      {/* Recipient Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Para quem?</Text>

        {selectedRecipient ? (
          <UserChip user={selectedRecipient} onRemove={handleRemoveRecipient} />
        ) : (
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar participantes"
              value={searchQuery}
              onChangeText={handleUserSearch}
              onFocus={() => setShowUserDropdown(true)}
            />

            {showUserDropdown && (
              <View style={styles.dropdown}>
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.userItem}
                      onPress={() => handleSelectUser(item)}
                    >
                      <Avatar uri={item.avatar} size={32} />
                      <Text style={styles.userName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>
                      {usersLoading
                        ? "Carregando..."
                        : "Nenhum usuário encontrado"}
                    </Text>
                  }
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Recognition Type Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Tipo de reconhecimento</Text>

        {selectedRecognitionType ? (
          <TouchableOpacity
            style={styles.selectedRecognition}
            onPress={() => setShowRecognitionTypes(true)}
          >
            <Text style={styles.emoji}>{selectedRecognitionType.emoji}</Text>
            <Text style={styles.recognitionName}>
              {selectedRecognitionType.name}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowRecognitionTypes(true)}
          >
            <Text style={styles.selectButtonText}>Selecionar</Text>
          </TouchableOpacity>
        )}

        {showRecognitionTypes && (
          <View style={styles.recognitionGrid}>
            {recognitionTypesLoading ? (
              <Text style={styles.emptyText}>Carregando...</Text>
            ) : (
              recognitionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.recognitionItem,
                    selectedRecognitionType?.id === type.id &&
                      styles.selectedRecognitionItem,
                  ]}
                  onPress={() => handleSelectRecognitionType(type)}
                >
                  <Text style={styles.emoji}>{type.emoji}</Text>
                  <Text style={styles.recognitionName}>{type.name}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>

      {/* Message */}
      <View style={styles.section}>
        <Text style={styles.label}>Mensagem</Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Digite sua mensagem de reconhecimento..."
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Imagem (opcional)</Text>

        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={handleRemoveImage}
            >
              <Text style={styles.removeImageText}>×</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={handlePickImage}
          >
            <Text style={styles.selectImageText}>Selecionar imagem</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {submitError && <Text style={styles.errorText}>{submitError}</Text>}

      {/* Submit Button */}
      <Button
        title="Completar"
        onPress={handleSubmit}
        loading={isSubmitting}
        fullWidth
        disabled={
          !selectedRecipient || !selectedRecognitionType || !message.trim()
        }
      />

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    marginTop: 4,
    maxHeight: 200,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  userName: {
    marginLeft: 12,
    fontSize: 16,
    color: "#000",
  },
  emptyText: {
    textAlign: "center",
    color: "#8E8E93",
    padding: 16,
  },
  selectButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  selectedRecognition: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  recognitionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  recognitionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  selectedRecognitionItem: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  emoji: {
    fontSize: 18,
    marginRight: 6,
  },
  recognitionName: {
    fontSize: 14,
    color: "#000",
  },
  messageInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    height: 100,
  },
  imageContainer: {
    position: "relative",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectImageButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    alignItems: "center",
  },
  selectImageText: {
    fontSize: 16,
    color: "#007AFF",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});
