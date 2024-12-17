import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useBudget } from "../BudgetContext";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AddSpendingScreen() {
  const { addSpending, budgets } = useBudget();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const budget = budgets.find((b) => b.id === id);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !amount || !category || !description) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const spendingAmount = Number(amount);
    if (spendingAmount > (budget?.remainingAmount || 0)) {
      Alert.alert("Error", "Amount exceeds remaining budget");
      return;
    }

    addSpending(id, {
      name,
      amount: spendingAmount,
      category,
      description,
      date: new Date(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Spending</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add Spending
      </Button>
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
  input: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 16,
  },
});
