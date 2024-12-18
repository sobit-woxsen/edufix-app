import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as ImagePicker from "expo-image-picker";

export default function EditCampaign() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock initial data - in a real app, fetch this based on the ID
  const [formData, setFormData] = useState({
    name: "School Library Fund",
    description: "Help us build a better library",
    minContribution: "1234567",
    targetAmount: "12345678987654",
    image: null as string | null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const captureImage = async () => {
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    console.log("Saving campaign:", id, formData);
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.title}>Edit Campaign</ThemedText>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Campaign Name</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
            placeholder="Enter campaign name"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Campaign Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, description: text }))
            }
            placeholder="Enter campaign description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>
            Minimum Contribution Amount (ETH)
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.minContribution}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, minContribution: text }))
            }
            placeholder="1234567 RS. "
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Target Amount (ETH)</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.targetAmount}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, targetAmount: text }))
            }
            placeholder="12345678987654 RS. "
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Upload Images</ThemedText>
          <View style={styles.imageButtonContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <ThemedText style={styles.imageButtonText}>
                Choose from Gallery
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={captureImage}>
              <ThemedText style={styles.imageButtonText}>
                Capture Image
              </ThemedText>
            </TouchableOpacity>
          </View>
          {formData.image && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: formData.image }}
                style={styles.imagePreview}
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>Save</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
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
  },
  imageButtonText: {
    color: "#666",
    textAlign: "center",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#ea495c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
