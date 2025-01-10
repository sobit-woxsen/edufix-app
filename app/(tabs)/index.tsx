import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const { user } = useAuth();

  console.log("USER: " + JSON.stringify(user));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#fff" }}
      headerImage={
        <Image
          source={require("@/assets/images/tested.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">EduFix</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>

      <View>
        <Text style={styles.title}>
          Welcome Woxsen University
          <HelloWave />
        </Text>
        <ThemedText style={styles.subtitle}>
          Revolutionizing Education Governance
        </ThemedText>

        {/* <ThemedText style={styles.content}>
          EduFix is the revolutionary platform that redefines how education is
          delivered and experienced. Whether you're a student aiming for
          academic success, a teacher looking to inspire, or a curious mind
          eager to learn, EduFix is here to make it happen.
        </ThemedText>

        <View style={styles.features}>
          <Text style={styles.featureTitle}>What Makes EduFix Special?</Text>
          <ThemedText style={styles.featureItem}>
            🛠 Report and Monitor Infrastructure
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            💰 Track Budget Allocations
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            🤝 Support Schools Through Crowdfunding
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            🔍 Optimize Resources Efficiently
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            📊 Gather Feedback from Parents and Teachers
          </ThemedText>
        </View>

        <ThemedText style={styles.cta}>
          Join the EduFix community today and take the first step towards
          smarter, more enjoyable learning. Let's fix education – together. */}
        {/* </ThemedText> */}
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 170,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "gray",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  subtitle: { fontSize: 18, marginBottom: 20, color: "#555" },
  content: { fontSize: 16, marginBottom: 20, lineHeight: 24, color: "#444" },
  features: { marginBottom: 20 },
  featureTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  featureItem: { fontSize: 16, marginVertical: 4, color: "#666" },
  cta: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  getStartedButton: {
    backgroundColor: "#ea495c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
