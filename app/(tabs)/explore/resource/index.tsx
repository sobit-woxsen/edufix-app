import { View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ResourceScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Resource</ThemedText>
      <View style={{ gap: 16, marginTop: 20 }}>
        <Link href="/explore/resource/create-resource-form">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Create Resource
          </ThemedText>
        </Link>
        <Link href="/explore/resource/view-resources">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Find Resources
          </ThemedText>
        </Link>
        <Link href="/explore/resource/manage-resources">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Manage Resources
          </ThemedText>
        </Link>
        <Link href="/explore">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Back to Menu
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}
