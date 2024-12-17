// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { TextInput, Button, HelperText } from "react-native-paper";
// import { Picker } from "@react-native-picker/picker";
// import { useBudget } from "./BudgetContext";
// import { useNavigation } from "@react-navigation/native";

// export default function AllocateBudget() {
//   const navigation = useNavigation();
//   const { schools, allocateBudget } = useBudget();
//   const [schoolId, setSchoolId] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = () => {
//     if (!schoolId || !amount || !description) {
//       setError("All fields are required");
//       return;
//     }

//     allocateBudget(schoolId, Number(amount), description);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={schoolId}
//           onValueChange={(itemValue) => setSchoolId(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Choose School" value="" />
//           {schools.map((school) => (
//             <Picker.Item
//               key={school.id}
//               label={school.name}
//               value={school.id}
//             />
//           ))}
//         </Picker>
//       </View>

//       <TextInput
//         label="Enter Budget"
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         left={<TextInput.Affix text="$" />}
//       />

//       <TextInput
//         label="Description/Category"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//         multiline
//       />

//       {error ? <HelperText type="error">{error}</HelperText> : null}

//       <Button mode="contained" onPress={handleSubmit} style={styles.button}>
//         Allocate
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//   },
//   input: {
//     marginBottom: 16,
//     backgroundColor: "#fff",
//   },
//   button: {
//     marginTop: 16,
//     paddingVertical: 8,
//   },
// });

import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useBudget } from "./BudgetContext";
import { useNavigation } from "@react-navigation/native";

export default function AllocateBudget() {
  const navigation = useNavigation();
  const { schools, allocateBudget } = useBudget();
  const [schoolId, setSchoolId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!schoolId || !amount || !description) {
      setError("All fields are required");
      return;
    }

    allocateBudget(schoolId, Number(amount), description);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allocate Budget</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Select School</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={schoolId}
            onValueChange={(itemValue) => setSchoolId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose School" value="" />
            {schools.map((school) => (
              <Picker.Item
                key={school.id}
                label={school.name}
                value={school.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter Budget</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter budget amount"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description/Category</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          placeholder="Enter description or category"
          multiline
          numberOfLines={4}
        />
      </View>

      {error ? <HelperText type="error">{error}</HelperText> : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Allocate
      </Button>
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
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#ea495c",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
