import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Search } from "lucide-react-native";
import ImageCarousel from "../../components/ImageCrousel";
import CouponCard from "../../components/CouponCard";

const Header = ({ username = "Pravesh" }) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.usernameText}>{username}!</Text>
    </View>
    <Image
      source={require("../../assets/images/gymmeLogo.svg")}
      style={styles.logo}
    />
  </View>
);

const SearchBar = () => {
  const placeholders = [
    "gym workout",
    "cardio",
    "crossfit",
    "zumba",
    "aerobics",
    "boxing",
    "martial arts",
    "expertise",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(placeholders[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // First fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          // Update the text when fully faded out
          const nextIndex = (placeholderIndex + 1) % placeholders.length;
          setPlaceholderIndex(nextIndex);
          setDisplayedText(placeholders[nextIndex]);
          
          // Then fade back in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim, placeholderIndex]);

  return (
    <View style={styles.searchContainer}>
      <Search size={20} color="#666" />
      <View style={styles.searchInput}>
        <Text style={styles.staticText}>Search for </Text>
        <Animated.Text style={[styles.animatedText, { opacity: fadeAnim }]}>
          {displayedText}
        </Animated.Text>
      </View>
    </View>
  );
};

const FeatureCard = ({ title, subtitle, color, icon, style, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.card, { backgroundColor: color }, style]}
  >
    {icon}
    <Text style={styles.cardTitle}>{title}</Text>
    {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
  </TouchableOpacity>
);

const HomePage: React.FC = () => {
  const handleCouponPress = () => {
    // Do nothing for now
  };

  const handleFeatureCardPress = (title) => {
    console.log(`${title} card pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <SearchBar />

        <View style={styles.grid}>
          <View style={styles.grid}>
            <FeatureCard
              title="Live Personal Training"
              subtitle=""
              color="#FF4B4B"
              style={styles.squareCard}
              icon={<View style={styles.liveIndicator} />}
              onPress={() => handleFeatureCardPress("Live Personal Training")}
            />
            <FeatureCard
              title="Recorded Home Workout"
              subtitle=""
              color="#4B7BFF"
              style={styles.squareCard}
              icon={<Text style={styles.freeTag}>Free!!</Text>}
              onPress={() => handleFeatureCardPress("Recorded Home Workout")}
            />
            <FeatureCard
              title="Personal Training"
              subtitle="@Nearby Gym"
              icon=""
              color="#8B4BFF"
              style={styles.squareCard}
              onPress={() => handleFeatureCardPress("Personal Training")}
            />
            <FeatureCard
              title="Diet Planning"
              color="#FF8B4B"
              subtitle=""
              style={styles.squareCard}
              icon={<Text style={styles.freeTag}>Free!!</Text>}
              onPress={() => handleFeatureCardPress("Diet Planning")}
            />
            <FeatureCard
              title="Calorie Counter"
              color="#4BFF8B"
              style={styles.squareCard}
              onPress={() => handleFeatureCardPress("Calorie Counter")}
            />
            <FeatureCard
              title="Decode Age"
              subtitle="(Forever Young)"
              color="#FFD700"
              style={styles.squareCard}
              onPress={() => handleFeatureCardPress("Decode Age")}
            />
          </View>
        </View>

        <ImageCarousel
          title="Professional trainer's real life"
          images={[
            {
              src: require("../../assets/images/1.png"),
              alt: "Trainer demonstrating medicine ball exercise",
            },
            {
              src: require("../../assets/images/2.png"),
              alt: "Trainer demonstrating standing exercise",
            },
            {
              src: require("../../assets/images/3.png"),
              alt: "Trainer demonstrating workout routine",
            },
          ]}
        />
        <CouponCard
          discount={50}
          description="Get exclusive discount on your next purchase"
          onPress={handleCouponPress}
        />
        <ImageCarousel
          title="Your fitness and healthy lifestyle made easy"
          images={[
            {
              src: require("../../assets/images/1.png"),
              alt: "Trainer demonstrating medicine ball exercise",
            },
            {
              src: require("../../assets/images/2.png"),
              alt: "Trainer demonstrating standing exercise",
            },
            {
              src: require("../../assets/images/3.png"),
              alt: "Trainer demonstrating workout routine",
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
    padding: 16,
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
    width: 80,
    height: 30,
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
    flexDirection: "row",
  },
  staticText: {
    color: "#666",
  },
  animatedText: {
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  squareCard: {
    width: "47%",
    height: 180,
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
