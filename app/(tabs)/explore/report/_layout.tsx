import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Report",
        }}
      />

      <Stack.Screen
        name="create"
        options={{
          title: "Create a Resource",
        }}
      />
      <Stack.Screen
        name="report-form"
        options={{
          title: "Report Form",
        }}
      />
      <Stack.Screen
        name="view-issues"
        options={{
          title: "View Issues",
        }}
      />
      <Stack.Screen
        name="view-reports"
        options={{
          title: "View Reports",
        }}
      />
    </Stack>
  );
}
