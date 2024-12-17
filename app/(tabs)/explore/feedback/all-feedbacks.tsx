import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFeedbackContext } from "./FeedbackContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const AllFeedbacks = () => {
  const { feedbacks } = useFeedbackContext();

  const renderFeedbackItem = ({ item }) => {
    const givenRatingColor =
      item.rating >= 4 ? "#ea495c" : item.rating >= 2 ? "#FF9800" : "#F44336";

    return (
      <View style={styles.card}>
        {/* Feedback Header */}
        <View style={styles.header}>
          <Text style={styles.feedbackTitle}>
            {item.type === "school"
              ? item.schoolName
              : `${item.teacherName} (${item.schoolName})`}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: givenRatingColor }]}>
              {item.rating}
            </Text>
            <Text style={styles.totalRatingText}>/5</Text>
          </View>
        </View>

        {/* Feedback Content */}
        <Text style={styles.feedbackContent}>{item.content}</Text>

        {/* Feedback Meta */}
        <View style={styles.metaContainer}>
          <Text style={styles.feedbackMeta}>
            <Text style={styles.metaLabel}>Date: </Text>
            {item.createdAt.toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Feedbacks
      </ThemedText>

      {/* Feedback List */}
      <FlatList
        data={feedbacks}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    // textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ea495c",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalRatingText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#666",
    marginLeft: 3,
  },
  feedbackContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  feedbackMeta: {
    fontSize: 14,
    color: "#888",
  },
  metaLabel: {
    fontWeight: "bold",
    color: "#555",
  },
});

export default AllFeedbacks;
