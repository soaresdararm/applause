import { AppHeader } from "@/src/components/ui/AppHeader";
import { ApplauseModal } from "@/src/components/ui/ApplauseModal";
import { FloatingActionButton } from "@/src/components/ui/FloatingActionButton";
import { FeedList } from "@/src/features/feed/components/FeedList";
import { useApplauseStore } from "@/src/stores/applauseStore";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [showApplauseModal, setShowApplauseModal] = useState(false);
  const { users, recognitionTypes, createApplause } = useApplauseStore();

  const handleCreateApplause = async (data: {
    recipientIds: string[];
    recognitionTypeId: string;
    message: string;
  }) => {
    try {
      await createApplause({
        recipientId: data.recipientIds[0],
        recognitionTypeId: data.recognitionTypeId,
        message: data.message,
      });

      setShowApplauseModal(false);
    } catch (error) {
      console.error("Error creating applause:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2543" />
      <AppHeader />
      <FeedList />

      <FloatingActionButton onPress={() => setShowApplauseModal(true)} />

      <ApplauseModal
        visible={showApplauseModal}
        onClose={() => setShowApplauseModal(false)}
        users={users}
        recognitionTypes={recognitionTypes}
        onSubmit={handleCreateApplause}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2543",
  },
});
