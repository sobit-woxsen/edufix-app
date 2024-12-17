// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { useReportContext } from "./ReportContext";

// const AllReportsScreen = () => {
//   const { reports } = useReportContext();

//   const renderItem = ({ item }) => (
//     <View style={styles.reportItem}>
//       <Text style={styles.reportTitle}>{item.category}</Text>
//       <Text>{item.description}</Text>
//       <Text>Location: {item.location}</Text>
//       <Text>Status: {item.status}</Text>
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
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   reportItem: {
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   reportTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default AllReportsScreen;

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useReportContext } from "./ReportContext";

const AllReportsScreen = () => {
  const { reports } = useReportContext();

  const renderItem = ({ item }) => (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>{item.category}</Text>
      <Text style={styles.reportText}>{item.description}</Text>
      <Text style={styles.reportDetails}>Location: {item.location}</Text>
      <Text style={styles.reportDetails}>Status: {item.status}</Text>
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
    // textAlign: "center",
    marginBottom: 20,
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
    shadowRadius: 4,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ea495c",
  },
  reportText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reportDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default AllReportsScreen;
