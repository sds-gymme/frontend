import React , {useEffect} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Text,
  Avatar,
  useTheme,
  Surface,
  Divider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
const { width } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GymDetails {
  id: string;
  name: string;
  logo: string;
  rating: number;
  price: string;
  timings: string;
  location: string;
  details: string;
  fullAddress: string;
  heroImage: string;
}

const sampleData: GymDetails = {
  id: "1",
  name: "Let's Play Academy",
  logo: "https://placeholder.com/logo.png",
  rating: 4.9,
  price: "₹169/hr",
  timings: "05:00 - 10:30PM",
  location: "Sector 5, Kandivali (West), Mumbai",
  details:
    "Dr. Patricia Ahoy specialist in Ear, Nose & Throat, and work in RS. Hermina Malang. It is a long established fact that a reader will be distracted by the readable content.",
  fullAddress:
    "Jl. Tangkuban Perahu No.31-33, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119",
  heroImage: "/placeholder.svg?height=200&width=400",
};

const CACHE_KEY = "nearby_gyms";



const GymDetailsScreen = () => {
  const theme = useTheme();
  const [gymData, setGymData] = React.useState<GymDetails>(sampleData);
  const { slug } = useLocalSearchParams();
  useEffect(
    () => {
      const fetchData = async () => {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const gym = parsedData.data.find((gym: any) => gym.id === slug);
          if (gym) {
            setGymData(gym);
          }
        }
      };
      fetchData();
    },
    [slug]
  )
 
  const handleSubmit = () => {
    router.replace("/nearbyGym");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="black" onPress={() => {}} />
        <Appbar.Content title={gymData.name} color="black" />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{ uri: gymData.heroImage }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <Surface style={styles.infoCard} elevation={1}>
            <View style={styles.gymInfo}>
              <Avatar.Image
                size={50}
                source={{ uri: gymData.logo }}
                style={styles.logo}
              />
              <View style={styles.gymDetails}>
                <Text variant="titleMedium" style={styles.gymName}>
                  Xersize
                </Text>
                <View style={styles.timeLocation}>
                  <Icon
                    name="clock-outline"
                    size={16}
                    color={theme.colors.outline}
                  />
                  <Text variant="bodySmall" style={styles.infoText}>
                    {gymData.timings}
                  </Text>
                </View>
                <View style={styles.timeLocation}>
                  <Icon
                    name="map-marker-outline"
                    size={16}
                    color={theme.colors.outline}
                  />
                  <Text variant="bodySmall" style={styles.infoText}>
                    {gymData.location}
                  </Text>
                </View>
              </View>
              <View style={styles.priceRating}>
                <View style={styles.rating}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text variant="bodyMedium">{gymData.rating}</Text>
                </View>
                <Text variant="titleMedium" style={styles.price}>
                  {gymData.price}
                </Text>
              </View>
            </View>
          </Surface>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Details
            </Text>
            <Text variant="bodyMedium" style={styles.detailsText}>
              {gymData.details}
            </Text>
          </View>

          <Divider />

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Location
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {gymData.fullAddress}
            </Text>
            <Image
              source={{ uri: "https://placeholder.com/map.png" }}
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.price}>{gymData.price}</Text>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
            <Text style={styles.payButtonText}>Pay Now</Text>
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
  header: {
    backgroundColor: "transparent",
    elevation: 0,
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
  heroImage: {
    width: width,
    height: 200,
  },
  infoCard: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  gymInfo: {
    flexDirection: "row",
    padding: 12,
  },
  logo: {
    backgroundColor: "#f0f0f0",
  },
  gymDetails: {
    flex: 1,
    marginLeft: 12,
  },
  gymName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  timeLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    marginLeft: 4,
    color: "#666",
  },
  priceRating: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  price: {
    fontWeight: "600",
    color: "#000",
    bottom: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 12,
  },
  detailsText: {
    lineHeight: 20,
    color: "#666",
  },
  addressText: {
    marginBottom: 12,
    color: "#666",
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
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

export default GymDetailsScreen;
