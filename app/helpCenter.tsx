import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";


const HelpCenter = () => {
  const socialMedia = [
    {
      id: "twitter",
      name: "Twitter",
      icon: require("../assets/images/twitter.svg"),
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: require("../assets/images/Instagram.svg"),
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: require("../assets/images/Facebook.svg"),
    },
    {
      id: "youtube",
      name: "Youtube",
      icon: require("../assets/images/Youtube.svg"),
    },
  ];

  const contactOptions = [
    {
      id: "call",
      title: "Call Us",
      icon: require("../assets/images/phone.svg"),
      color: "#E8F1FF",
    },
    {
      id: "email",
      title: "Email Us",
      icon: require("../assets/images/email.svg"),
      color: "#FFE8EC",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: require("../assets/images/whatsapp.svg"),
      color: "#E8FFE9",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            {/* <Image
              source={require("../assets/back-arrow.png")}
              style={styles.backIcon}
            /> */}
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Header Title</Text>
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Image
            source={require("../assets/images/illustration.svg")}
            style={styles.illustration}
            contentFit="contain"
          />
        </View>

        <View style={styles.contactOptionsContainer}>
          {contactOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.contactOption, { backgroundColor: option.color }]}
            >
              <Image source={option.icon} style={styles.contactIcon} />
              <Text style={styles.contactText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Our Social Media</Text>
          {socialMedia.map((platform) => (
            <TouchableOpacity key={platform.id} style={[styles.socialItem]}>
              <Image source={platform.icon} style={styles.socialIcon} />
              <Text style={styles.socialText}>{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 28,
  },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  illustration: {
    width: "80%",
    height: 200,
  },
  contactOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    marginBottom: 32,
  },
  contactOption: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    width: "28%",
  },
  contactIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  socialSection: {
    padding: 16,
    marginBottom: 50,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  socialItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: "#333333",
  },
});

export default HelpCenter;
