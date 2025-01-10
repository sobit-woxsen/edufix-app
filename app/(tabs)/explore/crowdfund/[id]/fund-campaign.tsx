import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCampaignContext } from "../CampaignContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RAZORPAY_KEY_ID } from "@env";

export default function FundCampaignScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { campaigns, editCampaign, addContribution } = useCampaignContext();
  const { id } = route.params;

  const campaign = campaigns.find((c) => c.id === id);
  const [amount, setAmount] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const [webViewHTML, setWebViewHTML] = useState("");

  const stripe = useStripe();

  const prefillData = {
    name: "Funder Name",
    email: "funder@example.com",
    contact: "9876543210",
  };

  if (!campaign) {
    return <Text style={styles.errorText}>Campaign not found</Text>;
  }

  console.log("razorpay", process.env.RAZORPAY_KEY_ID);

  // Razorpay HTML
  const razorpayHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Razorpay Payment</title>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body onload="openRazorpay()">
      <script>
        function openRazorpay() {
          var options = {
            key: 'rzp_test_UShxSf2XlWLQB6',
            amount: ${parseInt(amount) * 100},
            currency: "INR",
            name: "Fund Campaign",
            description: "Support the campaign",
            prefill: { name: "${prefillData.name}", email: "${
    prefillData.email
  }", contact: "${prefillData.contact}" },
            theme: { color: "#ea495c" },
            handler: function (response) {
              window.ReactNativeWebView.postMessage("success:" + response.razorpay_payment_id);
            },
            modal: { ondismiss: function() { window.ReactNativeWebView.postMessage("cancelled"); } }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        }
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const { data } = event.nativeEvent;

    if (data.includes("success")) {
      const paymentId = data.split(":")[1];
      Alert.alert("Payment Successful", `Payment ID: ${paymentId}`);
      addContribution(campaign.id, paymentId, amount);
      setShowWebView(false);
      navigation.goBack();
    } else if (data.includes("error") || data === "cancelled") {
      Alert.alert(
        "Payment Failed",
        "You cancelled the payment or an error occurred."
      );
      setShowWebView(false);
    }
  };

  const handlePayment = (method) => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    if (method === "razorpay") {
      setWebViewHTML(razorpayHTML);
      setShowWebView(true);
    } else if (method === "metamask") {
      handleMetaMaskPayment();
    }
  };

  const handleMetaMaskPayment = () => {
    const weiAmount = (parseFloat(amount) * 1e18).toString();
    const metaMaskLink = `ethereum:${campaign?.walletAddress}?value=${weiAmount}`;

    Linking.openURL(metaMaskLink).catch(() => {
      Alert.alert(
        "MetaMask Not Installed",
        "Ensure MetaMask mobile app is installed on your device."
      );
    });
  };

  const handleStripePayment = () => {
    Alert.alert("Feature Coming Soon");
  };

  return (
    <StripeProvider publishableKey="YOUR_STRIPE_PUBLISHABLE_KEY">
      <View style={styles.container}>
        {!showWebView ? (
          <>
            <Text style={styles.title}>Fund {campaign.name}</Text>
            <Text style={styles.subtitle}>{campaign.description}</Text>

            <Text style={styles.label}>Enter Amount to Fund (ETH)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.label}>Choose Payment Method:</Text>

            {/* Razorpay Button */}
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handlePayment("razorpay")}
            >
              <Icon name="credit-card" size={20} color="#fff" />
              <Text style={styles.buttonText}>Pay with Razorpay</Text>
            </TouchableOpacity>

            {/* MetaMask Button */}
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handlePayment("metamask")}
            >
              <Icon name="ethereum" size={20} color="#fff" />
              <Text style={styles.buttonText}>Pay with MetaMask</Text>
            </TouchableOpacity>

            {/* Stripe Button */}
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleStripePayment}
            >
              <Icon name="stripe" size={20} color="#fff" />
              <Text style={styles.buttonText}>Pay with Stripe</Text>
            </TouchableOpacity>
          </>
        ) : (
          <WebView
            originWhitelist={["*"]}
            source={{ html: webViewHTML }}
            onMessage={handleWebViewMessage}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
          />
        )}
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: "#3c3c3d",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});
