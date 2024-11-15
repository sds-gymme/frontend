import React, { useContext } from "react";
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
import {LogoutCurve} from "iconsax-react-native";
import { router } from "expo-router";

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
  const handlePress = (route: string) => {
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
          onPress={() => handlePress("Accepted")}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handlePress("Rejected")}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TrainerHome: React.FC = () => {
  const handlePress = (route: string) => {
    router.push(route);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={styles.scrollContent}>
          <Header />

          <View style={styles.appointmentsSection}>
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
            onPress={() => router.replace("/verification")}
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
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
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

export default TrainerHome;
