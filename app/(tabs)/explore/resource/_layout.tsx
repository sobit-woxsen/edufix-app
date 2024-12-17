import { Stack } from "expo-router";

export default function ResourceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Resource",
        }}
      />

      <Stack.Screen
        name="create-resource-form"
        options={{
          title: "Create Resource Form",
        }}
      />
      <Stack.Screen
        name="manage-resources"
        options={{
          title: "Manage Resources",
        }}
      />
      <Stack.Screen
        name="view-resources"
        options={{
          title: "View Resources",
        }}
      />
    </Stack>
  );
}
