import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Appbar,
  Text,
  Avatar,
  useTheme,
  Surface,
  Divider,
  Card,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

const { width } = Dimensions.get("window");

const sampleData = {
  id: "ChIJg1RmA5-AhYARaMlu7BcvyAw",
  name: "Pilates on Page, POP!",
  logo: "https://ui-avatars.com/api/?name=Pilates+on+Page",
  rating: 5,
  price: "169",
  timings: "Open Now",
  location: "Civic Center, San Francisco",
  details:
    "A specialized Pilates studio located in the heart of San Francisco, offering personalized fitness experiences.",
  fullAddress: "10 Page Street, San Francisco",
  heroImage: "/placeholder.svg?height=200&width=400",
  businessStatus: "OPERATIONAL",
  geometry: {
    location: {
      lat: 100.7743983,
      lng: 122.4210577,
    },
  },
  userRatingsTotal: 4,
  plusCode: {
    compound_code: "QHFH+QH Civic Center, San Francisco, CA, USA",
    global_code: "849VQHFH+QH",
  },
  photos: [
    {
      photo_reference: "",
    },
  ],
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

const CACHE_KEY = "nearby_gyms";

const GymDetailsScreen = () => {
  const theme = useTheme();
  const [gymData, setGymData] = React.useState<any>(null);
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const gym = parsedData.data?.find((gym: any) => gym.id === slug);
          if (gym) {
            setGymData({
              ...sampleData,
              ...gym,
              photos: gym.photos || [],
              plusCode: gym.plusCode || null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching gym data:", error);
        setGymData(sampleData);
      }
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("No authenticated user found");
    }
    const receipt = makeid(20);
    const { data, error } = await supabase.functions.invoke("new-order", {
      body: {
        amount: parseInt(gymData.price),
        currency: "INR",
        receipt: receipt,
      },
    });
    console.log(data, error);
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      console.log("Function returned an error", errorMessage);
    } else if (error instanceof FunctionsRelayError) {
      console.log("Relay error:", error.message);
    } else if (error instanceof FunctionsFetchError) {
      console.log("Fetch error:", error.message);
    }
    const options: CheckoutOptions = {
      description: "Gym Fee",
      key: "rzp_test_GYHF9s4PYt6ahc",
      amount: gymData.price,
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
      const { error: e } = await supabase.from("gym_orders").insert({
        user_id: user.id,
        gym_name: gymData.name,
        amount: gymData.price,
        receipt: receipt,
        razorpay_payment_id: d.razorpay_payment_id,
        razorpay_order_id: d.razorpay_order_id,
        razorpay_signature: d.razorpay_signature,
      });
      if (e) {
        console.error("Error inserting order", e);
        return;
      }
      router.replace("/");
    } catch (error: any) {
      // Handle failure
      console.log(error);
      Alert.alert("Error", error.code + " " + error.description);
    }
  };

  if (!gymData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        statusBarHeight={Platform.OS === "ios" ? 0 : undefined}
        style={styles.header}
      >
        <Appbar.BackAction
          color={theme.colors.primary}
          onPress={() => router.back()}
        />
        <Appbar.Content title="Gym Details" color={theme.colors.secondary} />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {gymData.photos?.[0]?.photo_reference ? (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${gymData.photos[0].photo_reference}&key=${process.env.EXPO_PUBLIC_API_KEY}`,
              }}
              style={styles.heroImage}
              resizeMode="cover"
              defaultSource={require("../../assets/images/Yoga.svg")}
            />
          ) : (
            <View style={[styles.heroImage, styles.placeholderImage]}>
              <Icon name="dumbbell" size={64} color={theme.colors.primary} />
            </View>
          )}

          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={styles.gradientOverlay}
          />

          <Card style={styles.infoCard}>
            <Card.Content>
              <View style={styles.gymInfo}>
                <Avatar.Image
                  size={80}
                  source={{
                    uri:
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(gymData.name),
                  }}
                  style={styles.logo}
                />
                <View style={styles.gymDetails}>
                  <Text variant="headlineSmall" style={styles.gymName}>
                    {gymData.name}
                  </Text>
                  <View style={styles.timeLocation}>
                    <Icon
                      name="clock-outline"
                      size={18}
                      color={theme.colors.primary}
                    />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {gymData.timings}
                    </Text>
                  </View>
                  <View style={styles.timeLocation}>
                    <Icon
                      name="map-marker-outline"
                      size={18}
                      color={theme.colors.primary}
                    />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {gymData.address}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                  <Icon name="star" size={24} color={theme.colors.primary} />
                  <Text variant="titleLarge" style={styles.ratingText}>
                    {gymData.rating}
                  </Text>
                </View>
                <Text variant="bodySmall">
                  ({gymData.userRatingsTotal} reviews)
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Location
            </Text>
            {/* <Text variant="bodyLarge" style={styles.addressText}>
              {gymData.fullAddress}
            </Text> */}
            {gymData.plusCode && (
              <Card style={styles.locationDescription}>
                <Card.Content>
                  <Text
                    variant="bodyMedium"
                    style={styles.locationDescriptionText}
                  >
                    Located in the{" "}
                    {gymData.plusCode.compound_code.split(",")[0]} area. Global
                    Location Code: {gymData.plusCode.global_code}
                  </Text>
                </Card.Content>
              </Card>
            )}
            {gymData.location?.latitude && gymData.location?.longitude ? (
              <MapView
                style={styles.mapImage}
                initialRegion={{
                  latitude: gymData.location.latitude,
                  longitude: gymData.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: gymData.location.latitude,
                    longitude: gymData.location.longitude,
                  }}
                  title={gymData.name}
                  description={gymData.address || ""}
                />
              </MapView>
            ) : (
              <View style={[styles.mapImage, styles.placeholderImage]}>
                <Text>Map not available</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <Surface style={styles.footer} elevation={4}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>₹{gymData.price}/hr</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </Surface>
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
  heroImage: {
    width: width,
    height: 250,
  },
  placeholderImage: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  infoCard: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
  },
  gymInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#f0f0f0",
    marginRight: 16,
  },
  gymDetails: {
    flex: 1,
  },
  gymName: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  timeLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    marginLeft: 8,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  addressText: {
    marginBottom: 12,
    color: "#666",
  },
  locationDescription: {
    marginVertical: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  locationDescriptionText: {
    color: "#666",
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
    fontWeight: "bold",
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
    fontSize: 18,
    fontWeight: "600",
  },
});

export default GymDetailsScreen;
