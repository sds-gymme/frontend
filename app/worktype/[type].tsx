import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Activity } from "iconsax-react-native";
import { supabase } from "@/lib/supabase";

const GymWorkout: React.FC = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const { type } = useLocalSearchParams();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select("*, workout_exercises(*)")
        .eq("worktype", type);
      if (error) {
        console.error(error);
        return;
      }
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  const handlePress = (route: any) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.gridItem}>
              <TouchableOpacity
                onPress={() => handlePress("/workout/" + workout.id)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/Chest.svg")}
                    style={styles.rectangleCard}
                  />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{workout.name}</Text>
                    <View style={styles.cardTextRow}>
                      <Activity size={24} color="#000000" />
                      <Text style={styles.cardText}>
                        {workout.workout_exercises.length} Excercises
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  grid: {
    flexDirection: "column",
    padding: 10,
  },
  gridItem: {
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    position: "relative",
  },
  rectangleCard: {
    width: "100%",
    height: undefined,
    aspectRatio: 3.6,
    borderRadius: 20,
  },
  cardTextContainer: {
    position: "absolute",
    left: 16,
    bottom: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 8,
    borderRadius: 8,
  },
  cardTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
  },
});

export default GymWorkout;
