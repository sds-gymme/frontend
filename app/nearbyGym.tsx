import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Searchbar,
  Text,
  Avatar,
  useTheme,
  Surface,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";


interface Gym {
  id: string;
  name: string;
  logo: string;
  rating: number;
  price: string;
  timings: string;
  location: string;
}

const gyms: Gym[] = [
  {
    id: "1",
    name: "Let's Play Academy",
    logo: "dumbbell",
    rating: 4.9,
    price: "₹169/hr",
    timings: "07:00 - 11:00PM",
    location: "Sector 5, Kandivali (West), Mumbai",
  },
  {
    id: "2",
    name: "Xersize",
    logo: "weight-lifter",
    rating: 4.9,
    price: "₹169/hr",
    timings: "05:00 - 10:30PM",
    location: "Sector 5, Kandivali (West), Mumbai",
  },
];



const NearbyGymScreen = () => {
  const handlePress = (route: any) => {
    router.push(route);
  };
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useTheme();

  const GymCard = ({ gym }: { gym: Gym }) => (
    <TouchableOpacity onPress={() => handlePress("/gymDetails")}>
      <Surface style={styles.gymCard} elevation={1}>
        <View style={styles.gymInfo}>
          <Avatar.Icon
            size={50}
            icon={gym.logo}
            style={styles.logo}
            color={theme.colors.primary}
          />
          <View style={styles.gymDetails}>
            <Text variant="titleMedium" style={styles.gymName}>
              {gym.name}
            </Text>
            <View style={styles.timeLocation}>
              <Icon
                name="clock-outline"
                size={16}
                color={theme.colors.outline}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                {gym.timings}
              </Text>
            </View>
            <View style={styles.timeLocation}>
              <Icon
                name="map-marker-outline"
                size={16}
                color={theme.colors.outline}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                {gym.location}
              </Text>
            </View>
          </View>
          <View style={styles.priceRating}>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text variant="bodyMedium">{gym.rating}</Text>
            </View>
            <Text variant="titleMedium" style={styles.price}>
              {gym.price}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Nearby Gym" />
        <Appbar.Action icon="tune-variant" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Search here"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Gyms near you
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 0.5,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  gymCard: {
    marginBottom: 16,
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
    borderRadius: 6,
    height: 60,
    width: 60
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
    bottom: 15,
  },
});

export default NearbyGymScreen;
