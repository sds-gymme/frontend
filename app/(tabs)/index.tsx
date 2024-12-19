import React, { useState, useEffect, useRef } from "react";
import { useEvent } from 'expo';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import VideoCarousel from "@/components/VideoCarousel";
import CouponCard from "@/components/CouponCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { supabase } from "@/lib/supabase";

interface GridItem {
  id: string;
  source: any;
  route: string;
  tags: string[];
  title: string;
}

const HomePage: React.FC = () => {
  const [username, setUsername] = useState("User");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredGridItems, setFilteredGridItems] = useState<GridItem[]>([]);

  const gridItems: GridItem[] = [
    {
      id: "live-training",
      source: require("@/assets/images/LivePersonalTraining.svg"),
      route: "/livePersonalTraining",
      tags: ["live", "training", "personal", "fitness"],
      title: "Live Personal Training",
    },
    {
      id: "home-workout",
      source: require("@/assets/images/RecordedHomeWorkout.svg"),
      route: "/recordedHomeWorkout",
      tags: ["workout", "home", "recorded", "exercise"],
      title: "Recorded Home Workout",
    },
    {
      id: "nearby-gym",
      source: require("@/assets/images/PersonalTraining.svg"),
      route: "/nearbyGym",
      tags: ["gym", "nearby", "location", "training"],
      title: "Nearby Gym",
    },
    {
      id: "diet-planning",
      source: require("@/assets/images/DietPlanning.svg"),
      route: "/dietPlanning",
      tags: ["diet", "nutrition", "planning", "health"],
      title: "Diet Planning",
    },
    {
      id: "calorie-counter",
      source: require("@/assets/images/CalorieCounter.svg"),
      route: "/calorieCounter",
      tags: ["calories", "counter", "nutrition", "health"],
      title: "Calorie Counter",
    },
    {
      id: "decode-age",
      source: require("@/assets/images/DecodeAge.svg"),
      route: "/decodeAge",
      tags: ["age", "health", "fitness", "tracking"],
      title: "Decode Age",
    },
  ];

  const searchGridItems = (query: string) => {
    if (!query) {
      return gridItems;
    }

    const lowercaseQuery = query.toLowerCase();
    return gridItems.filter(
      (item) =>

        item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        item.title.toLowerCase().includes(lowercaseQuery)
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setFilteredGridItems(searchGridItems(debouncedQuery));
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("No authenticated user found");
        }

        const { data, error } = await supabase
          .from("user_profiles")
          .select("user_name")
          .eq("user_id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setUsername(data.user_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const Header = ({ username }: { username: string }) => (
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

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons
        size={20}
        style={[{ margin: "auto" }]}
        name="search"
        color="#666"
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search features..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const handlePress = (route: any) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header username={username} />
        <SearchBar />

        <View style={styles.grid}>
          {filteredGridItems.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <TouchableOpacity onPress={() => handlePress(item.route)}>
                <Image source={item.source} style={styles.squareCard} />
                <Text style={styles.gridItemTitle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <VideoCarousel
          title="Professional trainer's real life"
          videos={[
            {
              src: "https://videos.pexels.com/video-files/3209068/3209068-uhd_3840_2160_25fps.mp4",
            },
            {
              src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            },
            {
              src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            },
          ]}
        />
        <CouponCard />
        <VideoCarousel
          title="Your fitness and healthy lifestyle made easy"
          videos={[
            {
              src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            },
            {
              src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            },
            {
              src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            },
          ]}
        />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: "#333",
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#089f30",
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  gridItemTitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#f5f5f5",
  //   padding: 12,
  //   borderRadius: 12,
  //   marginBottom: 16,
  // },
  // searchInput: {
  //   marginLeft: 8,
  //   flex: 1,
  //   flexDirection: "row",
  // },
  staticText: {
    color: "#666",
  },
  animatedText: {
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  gridItem: {
    width: "50%",
    padding: 8,
  },
  squareCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
  },
  calorieCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "#089f30",
  },
  card: {
    padding: 16,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  freeTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomePage;
