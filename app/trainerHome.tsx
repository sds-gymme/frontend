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
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { LogoutCurve } from "iconsax-react-native";
import { router } from "expo-router";
import OnlineOfflineToggle from "@/components/TrainerToggle";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface Appointment {
  id: string;
  name: string;
  location: string;
  duration: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    name: "Siddhartha Gaur",
    location: "Mumbai",
    duration: "45 Min",
  },
  {
    id: "2",
    name: "Siddhartha Gaur",
    location: "Mumbai",
    duration: "45 Min",
  },
  {
    id: "3",
    name: "Siddhartha Gaur",
    location: "Mumbai",
    duration: "45 Min",
  },
  {
    id: "4",
    name: "Siddhartha Gaur",
    location: "Mumbai",
    duration: "45 Min",
  },
  {
    id: "5",
    name: "Siddhartha Gaur",
    location: "Mumbai",
    duration: "45 Min",
  },
];

const renderAppointment = ({ item }: { item: Appointment }) => {
  const handlePress = (route: any) => {
    router.push(route);
  };

  return (
    <View style={styles.appointmentCard}>
      <Image
        source={require("@/assets/images/Zumba.svg")}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handlePress("/underdev")}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handlePress("/underdev")}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TrainerHome: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [name, setName] = useState("Vaibhav"); // Simplified to just use a static name

  const handlePress = (route: any) => {
    router.push(route);
  };

  const handleOnlineToggle = async (isOnline: boolean) => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("No authenticated user found");
      }
      const values = {
        online: isOnline,
      };
      console.log(values);
      const { data, error } = await supabase
        .from("trainer_profiles")
        .update(values)
        .eq("user_id", user.id)
        .select();
      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }
      setIsOnline(isOnline);
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error("No authenticated user found");
        }
        const { data, error } = await supabase
          .from("trainer_profiles")
          .select("online, name")
          .eq("user_id", user.id)
          .single();
        if (error) {
          console.error("Supabase fetch error:", error);
          throw error;
        }
        setIsOnline(data.online);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching online status:", error);
      }
    };
    fetchOnlineStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.scrollContent}>
          <Header username={"Trainer " + name} />
          <View style={styles.appointmentsSection}>
            <OnlineOfflineToggle
              isOnline={isOnline}
              setIsOnline={handleOnlineToggle}
            />
            <Text style={styles.headerText}>Your Appointments</Text>
            <FlatList
              data={appointments}
              renderItem={renderAppointment}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.appointmentsList}
            />
          </View>

          <ImageCarousel
            title="Customer Videos"
            images={[
              {
                src: require("@/assets/images/1.png"),
                alt: "Trainer demonstrating medicine ball exercise",
              },
              {
                src: require("@/assets/images/2.png"),
                alt: "Trainer demonstrating standing exercise",
              },
              {
                src: require("@/assets/images/3.png"),
                alt: "Trainer demonstrating workout routine",
              },
            ]}
          />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              await AsyncStorage.setItem("userType", "user");
              router.replace("/");
            }}
          >
            <LogoutCurve size={24} color="#666" variant="Linear" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    paddingTop: StatusBar.currentHeight || 0,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
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
    color: "#333",
  },
  appointmentCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 75,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginRight: 8,
  },
  duration: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
    marginLeft: 12,
  },
  acceptButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
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
    minWidth: 80,
    alignItems: "center",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default TrainerHome;
