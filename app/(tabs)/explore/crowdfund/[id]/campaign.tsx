// // import React from "react";
// // import { View, StyleSheet, ScrollView } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { ThemedText } from "@/components/ThemedText";
// // import { ThemedView } from "@/components/ThemedView";

// // export default function CampaignDetails() {
// //   const { id } = useLocalSearchParams();

// //   // In a real app, you would fetch the campaign details using the id
// //   // For this example, we'll use mock data
// //   const campaignDetails = {
// //     title: `Campaign ${id}`,
// //     description:
// //       "This is a sample campaign description. In a real app, this would be fetched from your backend or state management system.",
// //     goal: "$10,000",
// //     raised: "$5,000",
// //     backers: 50,
// //     daysLeft: 15,
// //   };

// //   return (
// //     <ThemedView style={styles.container}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         <ThemedText style={styles.title}>{campaignDetails.title}</ThemedText>

// //         <View style={styles.statsContainer}>
// //           <View style={styles.statItem}>
// //             <ThemedText style={styles.statValue}>
// //               {campaignDetails.raised}
// //             </ThemedText>
// //             <ThemedText style={styles.statLabel}>Raised</ThemedText>
// //           </View>
// //           <View style={styles.statItem}>
// //             <ThemedText style={styles.statValue}>
// //               {campaignDetails.goal}
// //             </ThemedText>
// //             <ThemedText style={styles.statLabel}>Goal</ThemedText>
// //           </View>
// //           <View style={styles.statItem}>
// //             <ThemedText style={styles.statValue}>
// //               {campaignDetails.backers}
// //             </ThemedText>
// //             <ThemedText style={styles.statLabel}>Backers</ThemedText>
// //           </View>
// //           <View style={styles.statItem}>
// //             <ThemedText style={styles.statValue}>
// //               {campaignDetails.daysLeft}
// //             </ThemedText>
// //             <ThemedText style={styles.statLabel}>Days Left</ThemedText>
// //           </View>
// //         </View>

// //         <ThemedText style={styles.sectionTitle}>About this campaign</ThemedText>
// //         <ThemedText style={styles.description}>
// //           {campaignDetails.description}
// //         </ThemedText>
// //       </ScrollView>
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
// //   statsContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 20,
// //   },
// //   statItem: {
// //     alignItems: "center",
// //   },
// //   statValue: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   statLabel: {
// //     fontSize: 14,
// //     color: "#666",
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     marginTop: 20,
// //     marginBottom: 10,
// //   },
// //   description: {
// //     fontSize: 16,
// //     lineHeight: 24,
// //   },
// // });

// import React from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function SchoolCampaignView() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   // Mock data - in a real app, fetch this based on the ID
//   const campaignDetails = {
//     name: "School Library Fund",
//     targetAmount: 23453,
//     achievedAmount: 100,
//   };

//   const handleWithdrawal = () => {
//     router.push(`/campaigns/${id}/withdraw`);
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText style={styles.title}>{campaignDetails.name}</ThemedText>

//       <View style={styles.amountContainer}>
//         <View style={styles.amountBox}>
//           <ThemedText style={styles.label}>Target Amount</ThemedText>
//           <ThemedText style={styles.amount}>
//             ${campaignDetails.targetAmount}
//           </ThemedText>
//         </View>

//         <View style={styles.amountBox}>
//           <ThemedText style={styles.label}>Achieved Amount</ThemedText>
//           <ThemedText style={styles.amount}>
//             ${campaignDetails.achievedAmount}
//           </ThemedText>
//         </View>
//       </View>

//       <TouchableOpacity
//         style={styles.withdrawButton}
//         onPress={handleWithdrawal}
//       >
//         <ThemedText style={styles.withdrawButtonText}>
//           Withdrawal Request
//         </ThemedText>
//       </TouchableOpacity>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   amountContainer: {
//     marginBottom: 30,
//   },
//   amountBox: {
//     backgroundColor: "#F0F7FF",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 5,
//   },
//   amount: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#4A90E2",
//   },
//   withdrawButton: {
//     backgroundColor: "#4A90E2",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   withdrawButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCampaignContext } from "../CampaignContext";
import { Link } from "expo-router";

export default function CampaignDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { campaigns, startCampaign, stopCampaign, withdrawRequest } =
    useCampaignContext();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  const handleAction = () => {
    if (campaign.status === "pending") {
      startCampaign(id);
    } else if (campaign.status === "active") {
      stopCampaign(id);
    } else if (campaign.status === "stopped") {
      withdrawRequest(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{campaign.name}</Text>
      <Text style={styles.description}>{campaign.description}</Text>
      {campaign.image && (
        <Image source={{ uri: campaign.image }} style={styles.image} />
      )}
      <Text>Minimum Contribution: {campaign.minContribution} ETH</Text>
      <Text>Target Amount: {campaign.targetAmount} ETH</Text>
      <Text>Amount Collected: {campaign.amountCollected} ETH</Text>
      <Text>Status: {campaign.status}</Text>

      <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
        <Text style={styles.actionButtonText}>
          {campaign.status === "pending"
            ? "Start Campaign"
            : campaign.status === "active"
            ? "Stop Campaign"
            : campaign.status === "stopped"
            ? "Request Withdrawal"
            : "No Action"}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.editButton}
        // onPress={() =>
        //   navigation.navigate("edit-campaign", { id: campaign.id })
        // }
      > */}
      <Link style={styles.editButton} href={`/explore/crowdfund/${id}/edit`}>
        <Text style={styles.editButtonText}>Edit Campaign</Text>
      </Link>
      {/* </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  actionButton: {
    backgroundColor: "#ea495c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#6C757D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
