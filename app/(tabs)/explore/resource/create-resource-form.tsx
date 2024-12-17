// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useResourceContext } from "./ResourceContext";
// import { useNavigation } from "expo-router";

// const CreateResource = () => {
//   const { addResource } = useResourceContext();
//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [school, setSchool] = useState("");
//   const [description, setDescription] = useState("");
//   const [availability, setAvailability] = useState(true);
//   const navigation = useNavigation();

//   const handleSubmit = () => {
//     addResource({
//       name,
//       type,
//       school,
//       description,
//       availability,
//     });
//     navigation.goBack();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Create New Resource</Text>

//       <Text style={styles.label}>Resource Name:</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//         placeholder="Enter resource name"
//       />

//       <Text style={styles.label}>Resource Type:</Text>
//       <TextInput
//         style={styles.input}
//         value={type}
//         onChangeText={setType}
//         placeholder="Enter resource type"
//       />

//       <Text style={styles.label}>School:</Text>
//       <TextInput
//         style={styles.input}
//         value={school}
//         onChangeText={setSchool}
//         placeholder="Enter school name"
//       />

//       <Text style={styles.label}>Description:</Text>
//       <TextInput
//         style={styles.input}
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Enter resource description"
//         multiline
//         numberOfLines={4}
//       />

//       <Text style={styles.label}>Availability:</Text>
//       <Picker
//         selectedValue={availability}
//         onValueChange={(itemValue) => setAvailability(itemValue)}
//       >
//         <Picker.Item label="Available" value={true} />
//         <Picker.Item label="Not Available" value={false} />
//       </Picker>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Create Resource</Text>
//       </TouchableOpacity>
//     </ScrollView>
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
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
// export default CreateResource;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useResourceContext } from "./ResourceContext";
import { useNavigation } from "expo-router";

const CreateResource = () => {
  const { addResource } = useResourceContext();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [school, setSchool] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState(true);
  const navigation = useNavigation();

  const handleSubmit = () => {
    addResource({
      name,
      type,
      school,
      description,
      availability,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create New Resource</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Resource Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter resource name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Resource Type</Text>
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Enter resource type"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>School</Text>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
            placeholder="Enter school name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter resource description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Availability</Text>
          <Picker
            selectedValue={availability}
            onValueChange={(itemValue) => setAvailability(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Available" value={true} />
            <Picker.Item label="Not Available" value={false} />
          </Picker>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Resource</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#ea495c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateResource;
