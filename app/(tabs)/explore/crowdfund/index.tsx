import { View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function CrowdFundScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">CSR Funding</ThemedText>
      <View style={{ gap: 16, marginTop: 20 }}>
        {/* For Schools */}
        <Link href="/explore/crowdfund/campaign-form">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Start a Campaign
          </ThemedText>
        </Link>

        <Link href="/explore/crowdfund/campaigns">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            View Campaigns
          </ThemedText>
        </Link>
        {/* For schools */}

        <Link href="/explore">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Back to Menu
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}
