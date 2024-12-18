import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";

export default function BudgetScreen() {
  const budgetLinks = [
    {
      href: "/explore/budget/allocate-budget-form",
      label: "Allocate Budget",
      icon: (
        <MaterialIcons
          name="account-balance-wallet"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      href: "/explore/budget/allocated-budgets",
      label: "See Allocated Budgets",
      icon: (
        <MaterialIcons
          name="bar-chart"
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
        Budget Rounds
      </ThemedText>
      <View style={styles.linksContainer}>
        {budgetLinks.map((link, index) => (
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
    marginRight: 10, // Ensures spacing between icon and text
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
