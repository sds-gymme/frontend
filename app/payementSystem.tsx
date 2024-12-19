import React from "react";
import { View, Button, Alert } from "react-native";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";

const PaymentScreen = () => {
  const handlePayment = () => {
    const options: CheckoutOptions = {
      description: "Test Payment", // Adding the required description field
      key: "rzp_test_GYHF9s4PYt6ahc",
      amount: 5000, // Amount should be a number, not a string
      currency: "INR",
      name: "Your Company Name",
      order_id: "order_9A33XWu170gUtm",
      prefill: {
        email: "user@example.com",
        contact: "9999999999",
        name: "John Doe",
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // Handle failure
        Alert.alert("Error", error.code + " " + error.description);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;