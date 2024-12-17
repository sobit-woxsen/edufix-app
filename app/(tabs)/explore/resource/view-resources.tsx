// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useResourceContext } from "./ResourceContext";

// const ViewResources = ({ navigation }) => {
//   const { resources, addRequest } = useResourceContext();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");

//   const filteredResources = resources.filter(
//     (resource) =>
//       (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         resource.school.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (filterType === "" || resource.type === filterType)
//   );

//   const handleRequest = (resourceId: string) => {
//     addRequest({
//       resourceId,
//       requesterName: "Current User", // In a real app, get this from user context
//       requesterSchool: "Current School", // In a real app, get this from user context
//       status: "pending",
//     });
//     alert("Request submitted successfully!");
//   };

//   const renderResourceItem = ({ item }) => (
//     <View style={styles.resourceItem}>
//       <Text style={styles.resourceName}>{item.name}</Text>
//       <Text>Type: {item.type}</Text>
//       <Text>School: {item.school}</Text>
//       <Text>Description: {item.description}</Text>
//       <Text>
//         Availability: {item.availability ? "Available" : "Not Available"}
//       </Text>
//       <TouchableOpacity
//         style={styles.requestButton}
//         onPress={() => handleRequest(item.id)}
//         disabled={!item.availability}
//       >
//         <Text style={styles.requestButtonText}>
//           {item.availability ? "Request Resource" : "Not Available"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>View Resources</Text>

//       <TextInput
//         style={styles.searchInput}
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//         placeholder="Search resources..."
//       />

//       <Picker
//         selectedValue={filterType}
//         onValueChange={(itemValue) => setFilterType(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="All Types" value="" />
//         <Picker.Item label="Technology" value="Technology" />
//         <Picker.Item label="Laboratory" value="Laboratory" />
//         <Picker.Item label="Facility" value="Facility" />
//       </Picker>

//       <FlatList
//         data={filteredResources}
//         renderItem={renderResourceItem}
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
//   searchInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   picker: {
//     marginBottom: 10,
//   },
//   resourceItem: {
//     backgroundColor: "#f0f0f0",
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   resourceName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   requestButton: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   requestButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// export default ViewResources;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useResourceContext } from "./ResourceContext";

const ViewResources = ({ navigation }) => {
  const { resources, addRequest } = useResourceContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(""); // Default filter type is empty

  // Filtered resources based on searchTerm and filterType
  const filteredResources = resources.filter(
    (resource) =>
      (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.school.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || resource.type === filterType)
  );

  const handleRequest = (resourceId) => {
    addRequest({
      resourceId,
      requesterName: "Current User",
      requesterSchool: "Current School",
      status: "pending",
    });
    alert("Request submitted successfully!");
  };

  const renderResourceItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.resourceName}>{item.name}</Text>
        <Text style={styles.resourceType}>{item.type}</Text>
      </View>
      <Text style={styles.resourceDetail}>School: {item.school}</Text>
      <Text style={styles.resourceDetail}>Description: {item.description}</Text>
      <Text style={styles.resourceAvailability}>
        Availability:{" "}
        <Text
          style={{
            color: item.availability ? "#28a745" : "#dc3545",
            fontWeight: "bold",
          }}
        >
          {item.availability ? "Available" : "Not Available"}
        </Text>
      </Text>
      <TouchableOpacity
        style={[
          styles.requestButton,
          { backgroundColor: item.availability ? "#ea495c" : "#CCCCCC" },
        ]}
        onPress={() => handleRequest(item.id)}
        disabled={!item.availability}
      >
        <Text style={styles.requestButtonText}>
          {item.availability ? "Request Resource" : "Not Available"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Resources</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search resources..."
        placeholderTextColor="#aaa"
      />

      {/* Filter Picker */}
      {/* <View style={styles.pickerContainer}>
        <Text style={styles.filterLabel}>Filter by Type:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filterType}
            onValueChange={(itemValue) => setFilterType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All Types" value="" />
            <Picker.Item label="Technology" value="Technology" />
            <Picker.Item label="Laboratory" value="Laboratory" />
            <Picker.Item label="Facility" value="Facility" />
          </Picker>
        </View>
      </View> */}

      {/* Resource List */}
      <FlatList
        data={filteredResources}
        renderItem={renderResourceItem}
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
    backgroundColor: "#f4f6f9",
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
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    elevation: 2,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  resourceType: {
    fontSize: 14,
    color: "#6C757D",
    fontStyle: "italic",
  },
  resourceDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  resourceAvailability: {
    fontSize: 14,
    marginTop: 5,
    color: "#333",
  },
  requestButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ViewResources;
