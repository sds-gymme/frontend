import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";

interface TrainerInfo {
  id: string;
  name: string;
  location: string;
  years: string;
  certificate: string;
  duration: string;
  rating: number;
  price: string;
  languages: string;
  qualification: string;
  about: string;
}

const info: TrainerInfo = {
  id: "1",
  name: "Siddhartha Gaur",
  location: "Mumbai",
  years: "3",
  certificate: "Certified",
  rating: 4.5,
  duration: "45 Min",
  price: "169",
  languages: "English, Hindi",
  qualification: "Diploma in personal training",
  about: "Strength training expert. Let's build your dream physique!",
};

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const TrainerProfile = () => {
  const handleSubmit = () => {
    router.back();
  };
  const { id } = useLocalSearchParams();
  const [trainer, setTrainer] = useState<TrainerInfo>(info);

  const handlePayment = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("No authenticated user found");
    }

    const { data, error } = await supabase.functions.invoke("new-order", {
      body: {
        amount: parseInt(trainer.price),
        currency: "INR",
        receipt: makeid(20),
      },
    });
    console.log(data, error);
    const options: CheckoutOptions = {
      description: "Trainer Fee", // Adding the required description field
      key: "rzp_test_GYHF9s4PYt6ahc",
      amount: trainer.price,
      currency: "INR",
      name: "Gymme",
      order_id: data.id,
      prefill: {
        email: user.email,
        contact: user.phone,
        name: "John Doe",
      },
      theme: { color: "#F37254" },
    };
    try {
      const d = await RazorpayCheckout.open(options);
      // Handle success
      Alert.alert("Success", `Payment ID: ${d.razorpay_payment_id}`);
      router.replace("/");
    } catch (error: any) {
      // Handle failure
      console.log(error);
      Alert.alert("Error", error.code + " " + error.description);
    }
  };

  useEffect(() => {
    const fetchTrainer = async () => {
      const { data, error } = await supabase
        .from("trainer_profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching trainer", error);
        return;
      }
      setTrainer({ ...trainer, ...data });
    };
    fetchTrainer();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image
            source={require("@/assets/images/Zumba.svg")}
            style={styles.profileImage}
            contentFit="cover"
          />
          <View style={styles.headerInfo}>
            <View style={styles.certifiedBadge}>
              <MaterialIcons name="stars" size={20} color="green" />
              <Text style={styles.certified}>
                {trainer.certificate ? "Certified" : "Not Certified"}
              </Text>
            </View>
            <Text style={styles.name}>{trainer.name}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={20} />
              <Text style={styles.location}>{trainer.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.experienceIcon]}>
              <MaterialIcons name="military-tech" size={24} color="#FF4B55" />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statNumber}>{trainer.years}</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.ratingIcon]}>
              <MaterialIcons name="star" size={24} color="#4CAF50" />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statNumber}>{trainer.rating}</Text>
              <Text style={styles.statLabel}>Ratings</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Speak :</Text>
            <Text style={styles.sectionContent}>{trainer.languages}</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Qualification :</Text>
            <Text style={styles.sectionContent}>{trainer.qualification}</Text>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>{trainer.about}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>{trainer.price || "₹169"}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  certifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  certified: {
    fontSize: 16,
    color: "#089a2f",
    marginLeft: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginVertical: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    color: "#000",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    margin: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  experienceIcon: {
    backgroundColor: "#FFE8E9",
  },
  ratingIcon: {
    backgroundColor: "#E8F5E9",
  },
  statText: {
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  sectionRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    color: "#666",
    width: 120,
  },
  sectionContent: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  aboutSection: {
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  payButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TrainerProfile;
