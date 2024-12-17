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
import { useFeedbackContext, schools, teachers } from "./FeedbackContext";
import { useNavigation } from "@react-navigation/native";

const FeedbackForm = () => {
  const { addFeedback } = useFeedbackContext();
  const [type, setType] = useState<"school" | "teacher">("school");
  const [schoolName, setSchoolName] = useState(schools[0]);
  const [teacherName, setTeacherName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!content) {
      alert("Feedback content cannot be empty!");
      return;
    }
    addFeedback({
      type,
      schoolName,
      teacherName: type === "teacher" ? teacherName : undefined,
      content,
      rating,
      images: [], // Handle image upload in a real app
    });
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Submit Feedback</Text>

      {/* Feedback Type Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Feedback For</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="School" value="school" />
            <Picker.Item label="Teacher" value="teacher" />
          </Picker>
        </View>
      </View>

      {/* School Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select School</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={schoolName}
            onValueChange={(itemValue) => setSchoolName(itemValue)}
          >
            {schools.map((school) => (
              <Picker.Item key={school} label={school} value={school} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Teacher Picker */}
      {type === "teacher" && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Teacher</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={teacherName}
              onValueChange={(itemValue) => setTeacherName(itemValue)}
            >
              {teachers[schoolName].map((teacher) => (
                <Picker.Item key={teacher} label={teacher} value={teacher} />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {/* Feedback Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Feedback</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
          placeholder="Enter your feedback here"
        />
      </View>

      {/* Rating Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={rating}
            onValueChange={(itemValue) => setRating(itemValue)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Picker.Item key={value} label={`${value} Star`} value={value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    // textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
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
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackForm;
