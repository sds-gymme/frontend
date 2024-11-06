import { ArrowRight } from "lucide-react-native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface CouponCardProps {
  discount: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

interface ButtonProps {
  onClick?: () => void;
  style?: object;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  style,
  size = "md",
  children,
}) => {
  const sizeStyles = {
    sm: styles.buttonSm,
    md: styles.buttonMd,
    lg: styles.buttonLg,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, sizeStyles[size], style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default function CouponCard({
  discount = "50% OFF*",
  description = "Get an exclusive discount up to 50%* on your purchase with Nike",
  buttonText = "GET COUPON",
  onClick,
}: CouponCardProps) {
  return (
    <View style={styles.card}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/gymmeLogo.svg")}
          style={styles.logo}
        />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.discount}>{discount}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button onClick={onClick} style={styles.buttonStyle} size="sm">
          <Text style={styles.buttonText}>{buttonText}</Text>
          <ArrowRight size={16} color="#fff" style={styles.icon} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "linear-gradient(to right, #000, #FF0000)",
    alignItems: "center",
  },
  logoContainer: {
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 80,
    height: 30,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  discount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginVertical: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonSm: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonMd: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonLg: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 8,
  },
  buttonStyle: {
    marginTop: 8,
  },
});
