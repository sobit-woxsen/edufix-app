import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  DataTable,
  useTheme,
} from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { useBudget } from "./BudgetContext";
import { useRoute } from "@react-navigation/native";

export default function SchoolBudgetView() {
  const theme = useTheme();
  const route = useRoute();
  const { schoolId } = route.params as { schoolId: string };
  const { schools, budgets } = useBudget();

  const school = schools.find((s) => s.id === schoolId);
  const schoolBudgets = budgets.filter((b) => b.schoolId === schoolId);

  const totalBudget = schoolBudgets.reduce(
    (sum, budget) => sum + budget.totalAmount,
    0
  );
  const totalAllocated = schoolBudgets.reduce(
    (sum, budget) => sum + budget.allocatedAmount,
    0
  );
  const totalRemaining = schoolBudgets.reduce(
    (sum, budget) => sum + budget.remainingAmount,
    0
  );

  const spendingsByCategory = schoolBudgets
    .flatMap((budget) => budget.spendings)
    .reduce((acc, spending) => {
      acc[spending.category] = (acc[spending.category] || 0) + spending.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(spendingsByCategory).map(
    ([name, amount], index) => ({
      name,
      amount,
      percentage: (amount / totalAllocated) * 100,
      color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][index % 5],
    })
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{school?.name}</Title>
          <View style={styles.budgetOverview}>
            <View style={styles.budgetItem}>
              <Paragraph>Total Budget</Paragraph>
              <Title>${totalBudget.toLocaleString()}</Title>
            </View>
            <View style={styles.budgetItem}>
              <Paragraph>Remaining</Paragraph>
              <Title style={{ color: theme.colors.primary }}>
                ${totalRemaining.toLocaleString()}
              </Title>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Budget Allocation</Title>
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={300}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
          <View style={styles.legendContainer}>
            {chartData.map((data, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: data.color }]}
                />
                <Paragraph>
                  {data.name} ({data.percentage.toFixed(1)}%)
                </Paragraph>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Detailed Spendings</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
            </DataTable.Header>

            {schoolBudgets.flatMap((budget) =>
              budget.spendings.map((spending) => (
                <DataTable.Row key={spending.id}>
                  <DataTable.Cell>{spending.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    ${spending.amount.toLocaleString()}
                  </DataTable.Cell>
                  <DataTable.Cell>{spending.category}</DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
  },
  budgetOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  budgetItem: {
    alignItems: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  legendContainer: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
});
