import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";

const AboutPage: React.FC = () => {
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Image
            source={require("@/assets/images/gymmeLogo.svg")}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>About Gymme</Text>
          <Text style={styles.description}>
            Gymme is your all-in-one fitness companion, connecting you with
            professional gym trainers for live, personalized video sessions.
            With features like recorded home workouts, nearby gym discovery,
            diet planning, and on-demand fitness trainers at home, Gymme ensures
            your fitness goals are always within reach. Designed for convenience
            and flexibility, Gymme empowers you to take charge of your health,
            anytime, anywhere.
          </Text>
        </View>

        {/* <View style={styles.featuresGrid}>
          {[
            "Live Personal Training",
            "Recorded Home Workouts",
            "Nearby Gym Discovery",
            "Diet Planning",
            "On-Demand Trainers",
            "Flexible Scheduling",
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>{index + 1}</Text>
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    padding: 8,
  },
  logo: {
    width: 120,
    height: 30,
  },
  content: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#089f30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureIconText: {
    color: "#fff",
    fontWeight: "bold",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
});

export default AboutPage;
