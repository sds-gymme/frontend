import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import ImageCarousel from "@/components/ImageCarousel";
import CouponCard from "@/components/CouponCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { LoginContext } from "@/contexts/loginContext";
import { LogoutCurve } from "iconsax-react-native";
import { router } from "expo-router";
import { Info } from "lucide-react-native";
import { supabase } from "@/lib/supabase";

const { width } = Dimensions.get("window");

const Header = ({ username = "Trainer Vaibhav" }) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.usernameText}>{username}!</Text>
    </View>
    <Image
      source={require("@/assets/images/gymmeLogo.svg")}
      style={styles.logo}
    />
  </View>
);

interface TrainerInfo {
  id: string;
  name: string;
  location: string;
  experience: string;
  certificate: string;
  duration: string;
  rating: number;
  about: string;
}

const renderTrainer = ({ item }: { item: TrainerInfo }) => {
  const handlePress = (route: any) => {
    router.push(route);
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress("/trainerProfile/" + item.id)}
      style={styles.appointmentCard}
    >
      <Image
        source={require("@/assets/images/Zumba.svg")}
        style={styles.profileImage}
        contentFit="cover"
      />

      <View style={styles.infoContainer}>
        <View style={styles.inlineContainer}>
          <MaterialIcons name="stars" size={20} color="green" />
          <Text style={styles.certified}>{item.certificate || "Certified"}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.duration}>{item.about.slice(0, 10)}</Text>
        </View>
      </View>
      <MaterialIcons name="star" size={20} color="#fac81f" />
      <Text style={styles.endContainer}>{item.rating || 4.4}</Text>
    </TouchableOpacity>
  );
};

const TrainerPage: React.FC = () => {
  const handlePress = (route: any) => {
    router.push(route);
  };
  const [onlineTrainers, setOnlineTrainers] = useState<TrainerInfo[]>([]);

  useEffect(() => {
    const fetchOnlineTrainers = async () => {
      try {
        const { data, error } = await supabase
          .from("trainer_profiles")
          .select()
          .eq("online", true);
        if (error) {
          console.error("Supabase fetch error:", error);
          throw error;
        }

        if (data) {
          setOnlineTrainers(data);
        }
      } catch (error) {
        console.error("Error fetching online status:", error);
      }
    };
    fetchOnlineTrainers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.scrollContent}>
          <View style={styles.appointmentsSection}>
            <View style={styles.inlineContainer}>
              <Text style={styles.headerText}>Best Online Now</Text>
              {/* <View>
                <Text style={styles.live}>Live</Text>
              </View> */}
            </View>

            <FlatList
              data={onlineTrainers}
              renderItem={renderTrainer}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.appointmentsList}
            />
          </View>
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
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: StatusBar.currentHeight || 4,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 30,
  },
  appointmentsSection: {
    width: "100%",
    marginBottom: 24,
  },
  appointmentsList: {
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  appointmentCard: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 50,
    height: 65,
    borderRadius: 10,
  },
  live: {
    fontSize: 20,
    color: "#e02418",
    top: -8,
    left: 120,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 0,
  },
  endContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 4,
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
  },
  certified: {
    fontSize: 14,
    color: "#089a2f",
    marginBottom: 2,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  acceptButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  rejectButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rejectButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
});

export default TrainerPage;
