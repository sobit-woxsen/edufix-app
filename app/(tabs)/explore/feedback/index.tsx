import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";

export default function FeedbackScreen() {
  const feedbackLinks = [
    {
      href: "/explore/feedback/feedback-form",
      label: "Give Feedback",
      icon: (
        <MaterialIcons
          name="feedback"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      href: "/explore/feedback/all-feedbacks",
      label: "See Feedbacks",
      icon: (
        <MaterialIcons
          name="visibility"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      href: "/explore",
      label: "Back to Menu",
      icon: (
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Feedback
      </ThemedText>
      <View style={styles.linksContainer}>
        {feedbackLinks.map((link, index) => (
          <Link key={index} href={link.href} style={styles.card}>
            <TouchableOpacity style={styles.iconContainer}>
              {link.icon}
            </TouchableOpacity>
            <ThemedText type="link" style={styles.linkText}>
              {link.label}
            </ThemedText>
          </Link>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    // textAlign: "center",
  },
  linksContainer: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10, // Consistent spacing for icons
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
