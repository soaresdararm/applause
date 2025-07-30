import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/src/components/expo/ThemedText';
import { ThemedView } from '@/src/components/expo/ThemedView';

export default function GoalsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Metas
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Defina e acompanhe suas metas
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
