import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  image: any;
}

const baseImageURL =
  "https://xnjquyseausfrxytquvs.supabase.co/storage/v1/object/public/photos/";

const ExercisePage: React.FC = () => {
  const { id } = useLocalSearchParams();

  const [workout, setWorkout] = useState<any>();

  useEffect(() => {
    const fetchExercises = async () => {
      let { data, error } = await supabase
        .from("workouts")
        .select("*, workout_exercises(*, exercises(*))")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      setWorkout(data);
    };
    fetchExercises();
  }, []);

  if (!workout) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <Text style={styles.exerciseCount}>
            {workout.workout_exercises.length} Exercises
          </Text>
        </View>

        <View style={styles.exerciseList}>
          {workout.workout_exercises.map((e: any) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => router.push("exerciseDetails/" + e.exercises.id)}
            >
              <View style={styles.exerciseCard}>
                <Image
                  src={baseImageURL + e.exercises.photo_name}
                  style={styles.exerciseImage}
                  resizeMode="cover"
                />
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseName}>{e.exercises.name}</Text>
                  <Text style={styles.exerciseReps}>
                    {e.sets} Sets x {e.reps} Reps
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 16,
    color: "#666666",
  },
  exerciseList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 12,
    height: 80,
  },
  exerciseImage: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  exerciseReps: {
    fontSize: 14,
    color: "#666666",
  },
});

export default ExercisePage;
