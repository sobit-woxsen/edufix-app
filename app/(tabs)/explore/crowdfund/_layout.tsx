import React from "react";
import { Stack } from "expo-router";

export default function CrowdfundLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "CSR Funding" }} />
      <Stack.Screen name="campaigns" options={{ title: "Campaigns" }} />
      <Stack.Screen
        name="campaign-form"
        options={{
          title: "Create Campaign",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          title: `Campaign ${route?.params?.id}`,
        })}
      />

      <Stack.Screen
        name="[id]/campaign"
        options={({ route }) => ({
          title: `Campaign ${route?.params?.id}`,
        })}
      />

      <Stack.Screen
        name="[id]/edit"
        options={({ route }) => ({
          title: `Edit Campaign ${route?.params?.id}`,
        })}
      />
    </Stack>
  );
}
