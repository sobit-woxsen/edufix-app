// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useResourceContext } from "./ResourceContext";

// const ManageRequests = () => {
//   const { requests, resources, updateRequestStatus } = useResourceContext();

//   const renderRequestItem = ({ item }: { item: any }) => {
//     const resource = resources.find((r) => r.id === item.resourceId);
//     return (
//       <View style={styles.requestItem}>
//         <Text style={styles.requestTitle}>{resource?.name}</Text>
//         <Text>Requester: {item.requesterName}</Text>
//         <Text>School: {item.requesterSchool}</Text>
//         <Text>Status: {item.status}</Text>
//         <Text>Date: {item.date.toLocaleDateString()}</Text>
//         {item.status === "pending" && (
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.approveButton]}
//               onPress={() => updateRequestStatus(item.id, "approved")}
//             >
//               <Text style={styles.buttonText}>Approve</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button, styles.rejectButton]}
//               onPress={() => updateRequestStatus(item.id, "rejected")}
//             >
//               <Text style={styles.buttonText}>Reject</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Manage Requests</Text>
//       <FlatList
//         data={requests}
//         renderItem={renderRequestItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

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
//   requestItem: {
//     backgroundColor: "#f0f0f0",
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   requestTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   approveButton: {
//     backgroundColor: "#4CAF50",
//   },
//   rejectButton: {
//     backgroundColor: "#F44336",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// export default ManageRequests;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useResourceContext } from "./ResourceContext";

const ManageRequests = () => {
  const { requests, resources, updateRequestStatus } = useResourceContext();

  const renderRequestItem = ({ item }) => {
    const resource = resources.find((r) => r.id === item.resourceId);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.resourceName}>{resource?.name || "Unknown"}</Text>
          <Text
            style={[
              styles.statusText,
              item.status === "pending"
                ? styles.pendingStatus
                : item.status === "approved"
                ? styles.approvedStatus
                : styles.rejectedStatus,
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Requester:</Text> {item.requesterName}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>School:</Text> {item.requesterSchool}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Date:</Text>{" "}
            {item.date.toLocaleDateString()}
          </Text>
        </View>

        {item.status === "pending" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.approveButton]}
              onPress={() => updateRequestStatus(item.id, "approved")}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => updateRequestStatus(item.id, "rejected")}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ea495c",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pendingStatus: {
    color: "#FFB74D",
  },
  approvedStatus: {
    color: "#4CAF50",
  },
  rejectedStatus: {
    color: "#F44336",
  },
  cardBody: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ManageRequests;
