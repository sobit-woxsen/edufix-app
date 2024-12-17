import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useBudget } from "../BudgetContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function BudgetDetailScreen() {
  const { budgets } = useBudget();
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const budget = budgets.find((b) => b.id === id);

  if (!budget) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Budget not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{budget.description}</Text>
      {/* <Text style={styles.subTitle}>
        Total: ${budget.totalAmount.toLocaleString()} | Remaining: $
        {budget.remainingAmount.toLocaleString()}
      </Text> */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Allocated</Text>
        <Text style={styles.cardAmount}>
          ${budget.totalAmount.toLocaleString()}
        </Text>
        <Text style={styles.cardSubtitle}>Remaining</Text>
        <Text style={styles.cardAmountSmall}>
          ${budget.remainingAmount.toLocaleString()}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Spendings</Text>
      <FlatList
        data={budget.spendings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.spendingItem}>
            <Text style={styles.spendingName}>{item.name}</Text>
            <Text style={styles.spendingAmount}>
              ${item.amount.toLocaleString()}
            </Text>
            <Text style={styles.spendingDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No spendings yet</Text>}
      />

      <Link
        href={`/(tabs)/explore/budget/${id}/add-spending`}
        style={styles.actionButton}
      >
        {/* <TouchableOpacity style={styles.actionButton}> */}
        <Text style={styles.actionButtonText}>Add Spending</Text>
        {/* </TouchableOpacity> */}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  spendingItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  spendingName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spendingAmount: {
    fontSize: 14,
    color: "#555",
  },
  spendingDescription: {
    fontSize: 12,
    color: "#777",
  },
  noData: {
    textAlign: "center",
    color: "#999",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  actionButton: {
    backgroundColor: "#ea495c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#ea495c",
  },
  card: {
    backgroundColor: "#ea495c",
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardAmount: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  cardAmountSmall: {
    color: "#black",
    fontSize: 22,
    fontWeight: "bold",
  },
});
