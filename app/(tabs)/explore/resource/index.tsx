// import { View } from "react-native";
// import { Link } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function ResourceScreen() {
//   return (
//     <ThemedView style={{ flex: 1, padding: 16 }}>
//       <ThemedText type="title">Resource</ThemedText>
//       <View style={{ gap: 16, marginTop: 20 }}>
//         <Link href="/explore/resource/create-resource-form">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             Create Resource
//           </ThemedText>
//         </Link>
//         <Link href="/explore/resource/view-resources">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             Find Resources
//           </ThemedText>
//         </Link>
//         <Link href="/explore/resource/manage-resources">
//           <ThemedText style={{ fontSize: 20, fontWeight: "400" }} type="link">
//             Manage Resources
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

export default function ResourceScreen() {
  const resourceLinks = [
    {
      href: "/explore/resource/create-resource-form",
      label: "Create Resource",
      icon: (
        <MaterialIcons
          name="add-box"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      href: "/explore/resource/view-resources",
      label: "Find Resources",
      icon: (
        <MaterialIcons
          name="search"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      href: "/explore/resource/manage-resources",
      label: "Manage Resources",
      icon: (
        <MaterialIcons
          name="settings"
          size={30}
          color="#ea495c"
          style={{ marginRight: 10 }}
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
          style={{ marginRight: 10 }}
        />
      ),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Resource
      </ThemedText>
      <View style={styles.linksContainer}>
        {resourceLinks.map((link, index) => (
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
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 10, // Ensures consistent spacing for icons
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
