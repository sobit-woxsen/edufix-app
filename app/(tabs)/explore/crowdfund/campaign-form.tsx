import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { Text } from "@/components/Themed";
import * as ImagePicker from "expo-image-picker";
import { useCampaignContext } from "./CampaignContext";

export default function RequestCampaignForm() {
  const navigation = useNavigation();
  const { addCampaign } = useCampaignContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minContribution: "",
    targetAmount: "",
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

  const handleSubmit = () => {
    addCampaign(formData);
    console.log("Form submitted:", formData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Request for a Campaign</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Campaign Name</Text>
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
          <Text style={styles.label}>Campaign Description</Text>
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
          <Text style={styles.label}>Minimum Contribution Amount (ETH)</Text>
          <TextInput
            style={styles.input}
            value={formData.minContribution}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, minContribution: text }))
            }
            placeholder="1234567 ETH"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Target Amount (ETH)</Text>
          <TextInput
            style={styles.input}
            value={formData.targetAmount}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, targetAmount: text }))
            }
            placeholder="12345678987654 ETH"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Upload Images</Text>
          <View style={styles.imageButtonContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={captureImage}>
              <Text style={styles.imageButtonText}>Capture Image</Text>
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

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Request</Text>
        </TouchableOpacity>
      </ScrollView>
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
