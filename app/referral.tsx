import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";

const Referral: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}> 
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/image.png")} 
          style={styles.inviteImage}
          contentFit="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Invite Your Friends & Earn Rewards!
          {"\n\n"}
          Love working out with Gymme? Share the joy! With your unique referral code, invite friends to join Gymme, the app that lets you connect with professional trainers via live video calls from anywhere in the world.
          {"\n\n"}
          Here’s how it works:
          {"\n\n"}
          Your Reward: Earn free live training sessions or exclusive discounts for every friend who joins using your code.
          {"\n"}
          Their Reward: Your friends get a free trial session with a professional trainer when they sign up using your referral code.
          {"\n\n"}
          Why Invite Friends?
          {"\n\n"}
          Train Together, Virtually: Help your friends access world-class trainers.
          {"\n"}
          Unlimited Rewards: Invite as many friends as you like and keep earning!
          {"\n"}
          Track Your Progress: Stay motivated with a fitness buddy.
          {"\n\n"}
          Your Referral Code:
          {"\n"}
          [GYMME-50MRP]
          {"\n\n"}
          Tap below to share your code via WhatsApp, email, or social media and help more people get fit, anytime, anywhere!
          {"\n"}
          [Copy & Share Code]
          {"\n\n"}
          Let’s transform fitness journeys together—one live session at a time! 💪📱
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 290,
  },
  inviteImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    padding: 14,
    marginVertical: 16,
    shadowColor: "#1b1b1b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
});

export default Referral;