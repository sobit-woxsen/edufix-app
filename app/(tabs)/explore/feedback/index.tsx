import { View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function FeedbackScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Feedback</ThemedText>
      <View style={{ gap: 16, marginTop: 20 }}>
        <Link href="/explore/feedback/feedback-form">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Give feedback
          </ThemedText>
        </Link>
        <Link href="/explore/feedback/all-feedbacks">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            See feedbacks
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
