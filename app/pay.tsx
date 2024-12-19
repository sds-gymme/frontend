import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import { supabase } from "@/lib/supabase";

const PaymentScreen = () => {
    const handlePayment = async () => {
        const { data, error } = await supabase.functions.invoke("new-order", {
            body: {
                amount: 100,
                currency: "INR",
                receipt: "damn",
            },
        });
        console.log(data, error);
        const options: CheckoutOptions = {
            description: "Test Payment", // Adding the required description field
            key: "rzp_test_GYHF9s4PYt6ahc",
            amount: 100, // Amount should be a number, not a string
            currency: "INR",
            name: "Your Company Name",
            order_id: data.id,
            prefill: {
                email: "user@example.com",
                contact: "9999999999",
                name: "John Doe",
            },
            theme: { color: "#F37254" },
        };
        try {
            const d = await RazorpayCheckout.open(options)
        // Handle success
            Alert.alert("Success", `Payment ID: ${d.razorpay_payment_id}`);
        } catch (error) {
            // Handle failure
            console.log(error);
            Alert.alert("Error", error.code + " " + error.description);
        }
    };

    useEffect(() => {
        handlePayment();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Pay Now" onPress={handlePayment} />
        </View>
    );
};

export default PaymentScreen;
