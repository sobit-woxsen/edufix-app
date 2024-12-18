// import { View } from "react-native";
// import { Link } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function ReportScreen() {
//   return (
//     <ThemedView style={{ flex: 1, padding: 16 }}>
//       <ThemedText type="title">Reports</ThemedText>
//       <View style={{ gap: 16, marginTop: 20 }}>
//         {/* For Schools */}

//         {/* For schools */}
//         <Link href="/explore/report/report-form">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             Report a Issue
//           </ThemedText>
//         </Link>

//         {/* For Admninistrative department */}
//         <Link href="/explore/report/view-reports">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             See all reports
//           </ThemedText>
//         </Link>
//         {/* For Admninistrative department */}
//         <Link href="/explore/report/view-issues">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             See all Issues
//           </ThemedText>
//         </Link>
//         <Link href="/explore">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             Back to Menu
//           </ThemedText>
//         </Link>
//       </View>
//     </ThemedView>
//   );
// }

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";

export default function ReportScreen() {
  const reportLinks = [
    {
      href: "/explore/report/report-form",
      label: "Report an Issue",
      icon: (
        <MaterialIcons
          name="report"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/report/view-reports",
      label: "See All Reports",
      icon: (
        <MaterialIcons
          name="assignment"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/report/view-issues",
      label: "See All Issues",
      icon: (
        <MaterialIcons
          name="error"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore",
      label: "Back to Menu",
      icon: (
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Reports
      </ThemedText>
      <View style={styles.linksContainer}>
        {reportLinks.map((link, index) => (
          <Link key={index} href={link.href} style={styles.card}>
            <TouchableOpacity style={styles.iconContainer}>
              {link.icon}
            </TouchableOpacity>
            <ThemedText type="link" style={styles.linkText}>
              {link.label}
            </ThemedText>
          </Link>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    // textAlign: "center",
  },
  linksContainer: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
