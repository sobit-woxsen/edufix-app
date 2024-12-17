import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useReportContext } from "./ReportContext";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const ReportIssueScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const { addReport } = useReportContext();
  const navigation = useNavigation();

  // Pick image from gallery
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Capture image from camera
  const handleCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to grant camera permission to capture images."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !location || !category) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    addReport({
      title,
      description,
      location: `${location.latitude}, ${location.longitude}`,
      category,
      image: image || "placeholder.jpg",
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Report an Issue</Text>

        {/* Title Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter issue title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter issue description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Location Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity
            style={[styles.input, styles.locationPicker]}
            onPress={() => setMapVisible(true)}
          >
            <Text>
              {location
                ? `Lat: ${location.latitude.toFixed(
                    4
                  )}, Lng: ${location.longitude.toFixed(4)}`
                : "Select location on map"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter issue category"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Image Upload Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Attach Image</Text>
          <View style={styles.imageButtonContainer}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleImagePicker}
            >
              <Text style={styles.imageButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={handleCamera}>
              <Text style={styles.imageButtonText}>Capture Image</Text>
            </TouchableOpacity>
          </View>
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>

        {/* Map Modal */}
        <Modal visible={isMapVisible} animationType="slide">
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 22.5937,
              longitude: 78.9629,
              latitudeDelta: 10,
              longitudeDelta: 10,
            }}
            onPress={(e) => {
              setLocation(e.nativeEvent.coordinate);
            }}
          >
            {location && (
              <Marker coordinate={location} title="Selected Location" />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.mapCloseButton}
            onPress={() => setMapVisible(false)}
          >
            <Text style={styles.mapCloseButtonText}>Confirm Location</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
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
  locationPicker: {
    justifyContent: "center",
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#666",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#ea495c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  mapCloseButton: {
    backgroundColor: "#4A90E2",
    padding: 12,
    alignItems: "center",
  },
  mapCloseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReportIssueScreen;
