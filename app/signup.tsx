import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State for user role
  const [school, setSchool] = useState(""); // State for school selection
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  // Dummy schools list
  const schools = [
    "Springfield High School",
    "Riverdale High School",
    "Sunnydale Academy",
    "Greenwood International",
    "Starlight Academy",
  ];

  const handleSignup = async () => {
    if (username.length < 3 || password.length < 6) {
      setError(
        "Username must be at least 3 characters and password at least 6 characters"
      );
      return;
    }

    if (!role) {
      setError("Please select a role");
      return;
    }

    if ((role === "school" || role === "teacher") && !school) {
      setError("Please select a school");
      return;
    }

    const success = await signUp({ username, password, role, school }); // Pass school to signup
    if (success) {
      router.replace("/login");
    } else {
      setError("Username already exists");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/test.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create an Account</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Your Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => {
            setRole(itemValue);
            if (itemValue !== "teacher" && itemValue !== "school") {
              setSchool(""); // Clear school if the role changes
            }
          }}
          style={styles.input}
        >
          <Picker.Item label="Select a role" value="" />
          <Picker.Item label="Administrator" value="administrator" />
          <Picker.Item label="Teacher" value="teacher" />
          <Picker.Item label="Parent" value="parent" />
          <Picker.Item label="School" value="school" />
          <Picker.Item label="Corporate Sponsor" value="corporate_sponsor" />
        </Picker>
      </View>

      {(role === "school" || role === "teacher") && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Your School</Text>
          <Picker
            selectedValue={school}
            onValueChange={(itemValue) => setSchool(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select a school" value="" />
            {schools.map((schoolName, index) => (
              <Picker.Item key={index} label={schoolName} value={schoolName} />
            ))}
          </Picker>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Log in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#ea495c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "#ea495c",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
