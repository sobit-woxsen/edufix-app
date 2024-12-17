// // import React from "react";
// // import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// // import { Link } from "expo-router";
// // import { ThemedText } from "@/components/ThemedText";
// // import { ThemedView } from "@/components/ThemedView";

// // // Mock data for campaigns
// // const campaigns = [
// //   { id: "1", title: "Campaign 1" },
// //   { id: "2", title: "Campaign 2" },
// //   { id: "3", title: "Campaign 3" },
// // ];

// // export default function CampaignsScreen() {
// //   const renderCampaignItem = ({ item }: { item: any }) => (
// //     <Link href={`/explore/crowdfund/${item.id}`} asChild>
// //       <TouchableOpacity style={styles.campaignItem}>
// //         <ThemedText style={styles.campaignTitle}>{item.title}</ThemedText>
// //       </TouchableOpacity>
// //     </Link>
// //   );

// //   return (
// //     <ThemedView style={styles.container}>
// //       <ThemedText style={styles.title}>Campaigns</ThemedText>
// //       <FlatList
// //         data={campaigns}
// //         renderItem={renderCampaignItem}
// //         keyExtractor={(item) => item.id}
// //         style={styles.list}
// //       />
// //       <Link href="/explore/crowdfund/campaign-form" asChild>
// //         <TouchableOpacity style={styles.button}>
// //           <ThemedText style={styles.buttonText}>Create New Campaign</ThemedText>
// //         </TouchableOpacity>
// //       </Link>
// //     </ThemedView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     marginBottom: 20,
// //   },
// //   list: {
// //     flex: 1,
// //   },
// //   campaignItem: {
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ccc",
// //   },
// //   campaignTitle: {
// //     fontSize: 18,
// //   },
// //   button: {
// //     backgroundColor: "#007AFF",
// //     padding: 15,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// // });

// import React from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Link } from "expo-router";
// import { useCampaignContext } from "./CampaignContext";

// export default function CampaignList() {
//   const navigation = useNavigation();
//   const { campaigns } = useCampaignContext();

//   const renderItem = ({ item }) => (
//     <Link
//       style={styles.campaignItem}
//       href={`/explore/crowdfund/${item.id}/campaign`}
//     >
//       {/* <TouchableOpacity
//         style={styles.campaignItem}
//         onPress={() => navigation.navigate("campaign-detail", { id: item.id })}
//       > */}
//       <Text style={styles.campaignName}>{item.name}</Text>
//       <Text>Status: {item.status}</Text>
//       <Text>Target: {item.targetAmount} ETH</Text>
//       <Text>Collected: {item.amountCollected} ETH</Text>
//       {/* </TouchableOpacity> */}
//     </Link>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={campaigns}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   campaignItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   campaignName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { useCampaignContext } from "./CampaignContext";

export default function CampaignList() {
  const navigation = useNavigation();
  const { campaigns } = useCampaignContext();

  const renderItem = ({ item }) => (
    <Link href={`/explore/crowdfund/${item.id}/campaign`} asChild>
      <TouchableOpacity style={styles.card}>
        {/* Campaign Image Placeholder */}
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/150", // Placeholder if no image exists
          }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.campaignName}>{item.name}</Text>
          <Text style={styles.campaignText}>Status: {item.status}</Text>
          <Text style={styles.campaignText}>
            Target: {item.targetAmount} ETH
          </Text>
          <Text style={styles.campaignCollected}>
            Collected: {item.amountCollected} ETH
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Campaigns</Text>
      <FlatList
        data={campaigns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    // textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#e0e0e0",
  },
  content: {
    flex: 1,
  },
  campaignName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  campaignText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  campaignCollected: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ea495c",
  },
});
