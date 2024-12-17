import { View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ReportScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Reports</ThemedText>
      <View style={{ gap: 16, marginTop: 20 }}>
        {/* For Schools */}

        {/* For schools */}
        <Link href="/explore/report/report-form">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            Report a Issue
          </ThemedText>
        </Link>

        {/* For Admninistrative department */}
        <Link href="/explore/report/view-reports">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            See all reports
          </ThemedText>
        </Link>
        {/* For Admninistrative department */}
        <Link href="/explore/report/view-issues">
          <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
            See all Issues
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
