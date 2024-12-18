import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useReportContext } from "./ReportContext";

const AllIssuesScreen = () => {
  const { reports, assignIssue, resolveIssue, assignees } = useReportContext();
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const renderItem = ({ item }) => (
    <View style={styles.issueCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.issueTitle}>{item.category}</Text>
        <Text style={styles.statusBadge(item.status)}>{item.status}</Text>
      </View>
      <Text style={styles.issueDescription}>{item.description}</Text>
      <Text style={styles.issueLocation}>Location: {item.location}</Text>

      {item.status === "open" && (
        <View style={styles.actionContainer}>
          <Text style={styles.label}>Select Assignee:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAssignee}
              onValueChange={(value) => setSelectedAssignee(value)}
            >
              <Picker.Item label="Select an Assignee" value="" />
              {assignees.map((assignee) => (
                <Picker.Item key={assignee} label={assignee} value={assignee} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => {
              if (selectedAssignee) {
                assignIssue(item.id, selectedAssignee);
                setSelectedAssignee(""); // Clear after assigning
              } else {
                alert("Please select an assignee.");
              }
            }}
          >
            <Text style={styles.buttonText}>Assign</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === "assigned" && (
        <TouchableOpacity
          style={styles.resolveButton}
          onPress={() => resolveIssue(item.id)}
        >
          <Text style={styles.buttonText}>Mark Resolved</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Issues</Text>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
    margin: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  issueCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  issueDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  issueLocation: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  statusBadge: (status) => ({
    fontSize: 12,
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor:
      status === "open"
        ? "#FFB74D"
        : status === "assigned"
        ? "#64B5F6"
        : "#81C784",
  }),
  actionContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  assignButton: {
    backgroundColor: "#ea495c",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  resolveButton: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AllIssuesScreen;
