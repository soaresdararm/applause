import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/src/components/expo/HapticTab";
import { IconSymbol } from "@/src/components/expo/ui/IconSymbol";
import { CustomTabBarBackground } from "@/src/components/ui/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          },
          default: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: "Missões",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="checkmark.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Metas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="target" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="experiences"
        options={{
          title: "Experiências",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="sailboat.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="line.3.horizontal" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
