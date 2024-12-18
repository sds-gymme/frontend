import React, { useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

const sampleData = {
  id: "ChIJg1RmA5-AhYARaMlu7BcvyAw",
  name: "Pilates on Page, POP!",
  logo: "https://ui-avatars.com/api/?name=Pilates+on+Page",
  rating: 5,
  price: "₹169/hr",
  timings: "Open Now",
  location: "Civic Center, San Francisco",
  details:
    "A specialized Pilates studio located in the heart of San Francisco, offering personalized fitness experiences.",
  fullAddress: "10 Page Street, San Francisco",
  heroImage: "/placeholder.svg?height=200&width=400",
  businessStatus: "OPERATIONAL",
  geometry: {
    location: {
      lat: 37.7743983,
      lng: -122.4210577,
    },
  },
  userRatingsTotal: 4,
  plusCode: {
    compound_code: "QHFH+QH Civic Center, San Francisco, CA, USA",
    global_code: "849VQHFH+QH",
  },
};

const CACHE_KEY = "nearby_gyms";

const GymDetailsScreen = () => {
  const theme = useTheme();
  const [gymData, setGymData] = React.useState(sampleData);
  const { slug } = useLocalSearchParams();

  useEffect(() => {
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
  }, [slug]);

  const handleSubmit = () => {
    router.replace("/nearbyGym");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="black" onPress={() => router.back()} />
        <Appbar.Content title={"Gym Details"} color="black" />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{
              uri:
                gymData.photos && gymData.photos.length > 0
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${gymData.photos[0].photo_reference}&key=${process.env.EXPO_PUBLIC_API_KEY}`
                  : gymData.heroImage,
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <Surface style={styles.infoCard} elevation={1}>
            <View style={styles.gymInfo}>
              <Avatar.Image
                size={50}
                source={{
                  uri:
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(gymData.name),
                }}
                style={styles.logo}
              />
              <View style={styles.gymDetails}>
                <Text variant="titleMedium" style={styles.gymName}>
                  {gymData.name}
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

          <Divider />

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Location
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {gymData.fullAddress}
            </Text>
            {gymData.plusCode && (
              <View style={styles.locationDescription}>
                <Text
                  variant="bodySmall"
                  style={styles.locationDescriptionText}
                >
                  Located in the {gymData.plusCode.compound_code.split(",")[0]}{" "}
                  area. Global Location Code: {gymData.plusCode.global_code}
                </Text>
              </View>
            )}
            {gymData.geometry && (
              <MapView
                style={styles.mapImage}
                initialRegion={{
                  latitude: gymData.geometry.location.lat,
                  longitude: gymData.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: gymData.geometry.location.lat,
                    longitude: gymData.geometry.location.lng,
                  }}
                  title={gymData.name}
                  description={gymData.fullAddress}
                />
              </MapView>
            )}
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
  locationDescription: {
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
  },
  locationDescriptionText: {
    color: "#666",
    fontStyle: "italic",
  },
});

export default GymDetailsScreen;
