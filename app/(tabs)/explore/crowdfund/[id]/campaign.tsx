import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCampaignContext } from "../CampaignContext";
import { Link } from "expo-router";

export default function CampaignDetail() {
  const route = useRoute();
  const { id } = route.params;
  const {
    campaigns,
    startCampaign,
    stopCampaign,
    withdrawRequest,
    approveFundTransfer,
  } = useCampaignContext();
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
    } else if (campaign.status === "requested") {
      Alert.alert("Fund Transfered Successfully");
      approveFundTransfer(id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{campaign.name}</Text>
      <Text style={styles.description}>{campaign.description}</Text>
      {campaign.image && (
        <Image source={{ uri: campaign.image }} style={styles.image} />
      )}
      <Text>Minimum Contribution: {campaign.minContribution} ETH</Text>
      <Text>Target Amount: {campaign.targetAmount} ETH</Text>
      <Text>Amount Collected: {campaign.amountCollected} ETH</Text>
      <Text>Status: {campaign.status}</Text>
      {/* SHOW CONTRIBUTION */}
      <Text style={styles.contributionTitle}>Contributions</Text>
      {campaign.contributions.length > 0 ? (
        campaign.contributions.map((contribution) => (
          <View key={contribution.id} style={styles.contributionItem}>
            <Text>Payment ID: {contribution.id}</Text>
            <Text>Amount: {contribution.amount} INR</Text>
            <Text>Date: {contribution.date}</Text>
          </View>
        ))
      ) : (
        <Text>No contributions yet</Text>
      )}

      <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
        <Text
          style={styles.actionButtonText}
          disabled={campaign.status === "completed"}
        >
          {campaign.status === "pending"
            ? "Start Campaign"
            : campaign.status === "active"
            ? "Stop Campaign"
            : campaign.status === "stopped"
            ? "Request Withdrawal"
            : campaign.status === "requested"
            ? "Transfer Amount"
            : campaign.status === "completed"
            ? "Transfered"
            : "No Action"}
        </Text>
      </TouchableOpacity>
      {campaign.status !== "completed" && (
        <>
          <Link
            style={styles.editButton}
            href={`/explore/crowdfund/${id}/edit`}
          >
            <Text style={styles.editButtonText}>Edit Campaign</Text>
          </Link>
          <Link
            style={styles.fundButton}
            href={`/explore/crowdfund/${id}/fund-campaign`}
          >
            <Text style={styles.editButtonText}>Fund Campaign</Text>
          </Link>
        </>
      )}
    </ScrollView>
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
  fundButton: {
    backgroundColor: "#0E8303",
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
  contributionTitle: {
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 20,
    marginBottom: 5,
  },
  contributionItem: {
    backgroundColor: "#DFDFDF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
