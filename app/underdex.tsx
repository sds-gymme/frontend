import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UnderDevelopmentProps {
  onGoBack: () => void;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ onGoBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>This Page is Currently</Text>
        <Text style={styles.subHeading}>Under Development</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onGoBack}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: "#333333",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 20,
    color: "#666666",
    fontWeight: "500",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#333333",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UnderDevelopment;
