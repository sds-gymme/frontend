import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CouponCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={styles.leftContent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.brandText}>/GYM ME</Text>
        </LinearGradient>

        <View style={styles.rightContent}>
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>50% OFF*</Text>
            <Text style={styles.descriptionText}>
              Get exclusive discount upto 50%* {"\n"}to your purchase with Nike
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Coupon claimed")}
          >
            <Text style={styles.buttonText}>GET COUPON</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  card: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400, // Increased width
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  rightContent: {
    flex: 2,
    backgroundColor: "#dc2626", // Changed to red
    padding: 16,
  },
  brandText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  discountContainer: {
    marginBottom: 12,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#ffffff", // Changed to white for better contrast
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#ffffff", // Changed to white for contrast
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonText: {
    color: "#dc2626", // Changed to red for contrast
    fontSize: 14,
    fontWeight: "bold",
  },
});
