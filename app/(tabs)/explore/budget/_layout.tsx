import { Stack } from "expo-router";

export default function BudgetLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "budget",
        }}
      />
      <Stack.Screen
        name="allocate-budget-form"
        options={{
          title: "Allocate Budget Form",
        }}
      />
      <Stack.Screen
        name="allocated-budgets"
        options={{
          title: "Allocated Budgets",
        }}
      />
      <Stack.Screen
        name="[id]/budget-detail"
        options={({ route }) => ({
          title: `Budget Detail ${route?.params?.id}`,
        })}
      />
      <Stack.Screen
        name="[id]/add-spending"
        options={({ route }) => ({
          title: `Update Spendings ${route?.params?.id}`,
        })}
      />
      <Stack.Screen
        name="[id]/update-budget"
        options={({ route }) => ({
          title: `Budget ${route?.params?.id}`,
        })}
      />
      {/* <Stack.Screen
        name="your-budget"
        options={{
          title: "See Your budget",
        }}
      /> */}
    </Stack>
  );
}
