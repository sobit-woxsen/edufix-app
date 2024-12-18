// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { useReportContext } from "./ReportContext";

// const AllReportsScreen = () => {
//   const { reports } = useReportContext();

//   console.log("Reports screen initialized" + JSON.stringify(reports));

//   const renderItem = ({ item }) => (
//     <View style={styles.reportCard}>
//       <Text style={styles.reportTitle}>{item.category}</Text>
//       <Text style={styles.reportText}>{item.description}</Text>
//       <Text style={styles.reportDetails}>Location: {item.location}</Text>
//       <Text style={styles.reportDetails}>Status: {item.status}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>All Reports</Text>
//       <FlatList
//         data={reports}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     // textAlign: "center",
//     marginBottom: 20,
//   },
//   reportCard: {
//     backgroundColor: "#f9f9f9",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   reportTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#ea495c",
//   },
//   reportText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   reportDetails: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 5,
//   },
// });

// export default AllReportsScreen;

import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useReportContext } from "./ReportContext";

const AllReportsScreen = () => {
  const { reports } = useReportContext();

  console.log("Reports screen initialized", reports);

  const renderItem = ({ item }) => (
    <View style={styles.reportCard}>
      {/* Report Image */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.reportImage} />
      )}

      {/* Report Details */}
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportCategory}>{item.category}</Text>
      <Text style={styles.reportText}>{item.description}</Text>
      <Text style={styles.reportDetails}>Location: {item.location}</Text>
      <Text style={styles.reportDetails}>Status: {item.status}</Text>

      {/* Display assignedTo if available */}
      {item.assignedTo && (
        <Text style={styles.reportDetails}>Assigned To: {item.assignedTo}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Reports</Text>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    // textAlign: "center",
    color: "#333",
  },
  reportCard: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  reportImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  reportCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ea495c",
    marginBottom: 8,
  },
  reportText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  reportDetails: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default AllReportsScreen;
