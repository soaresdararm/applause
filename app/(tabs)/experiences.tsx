import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/src/components/expo/ThemedText';
import { ThemedView } from '@/src/components/expo/ThemedView';

export default function ExperiencesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Experiências
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Explore novas experiências e conquistas
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
