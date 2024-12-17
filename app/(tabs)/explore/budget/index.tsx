import { View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function BudgetScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Budget Rounds</ThemedText>
      <View style={{ gap: 16, marginTop: 20 }}>
        <Link href="/explore/budget/allocate-budget-form">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Allocate Budget
          </ThemedText>
        </Link>
        <Link href="/explore/budget/allocated-budgets">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            See Allocated Budgets
          </ThemedText>
        </Link>
        {/* <Link href="/explore/budget/your-budget">
          <ThemedText type="link">See Your Allocated Budget</ThemedText>
        </Link> */}
        <Link href="/explore">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Back to Menu
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}
