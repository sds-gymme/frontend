import React from "react";
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
import { router } from "expo-router";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  image: any;
}

const ExercisePage: React.FC = () => {
  const exercises: Exercise[] = [
    {
      id: "1",
      name: "PUSHUPS",
      sets: 3,
      reps: 12,
      image: require("@/assets/images/pushupBar.gif"),
    },
    {
      id: "2",
      name: "FLAT CHEST PRESS",
      sets: 3,
      reps: 12,
      image: require("@/assets/images/pecDecFly.gif"),
    },
    {
      id: "3",
      name: "CLOSE GRIP CHEST PRESS",
      sets: 3,
      reps: 12,
      image: require("@/assets/images/dumbellFly.gif"),
    },
    {
      id: "4",
      name: "CHEST FLY",
      sets: 3,
      reps: 12,
      image: require("@/assets/images/cableCrossover.gif"),
    },
  ];

  const handlePress = () => {
    router.push(`/excerciseDetails`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chest Workout</Text>
          <Text style={styles.exerciseCount}>4 Exercises</Text>
        </View>

        <View style={styles.exerciseList}>
          {exercises.map((exercise: any) => (
            <TouchableOpacity key={exercise.id} onPress={() => handlePress()}>
              <View style={styles.exerciseCard}>
                <Image
                  source={exercise.image}
                  style={styles.exerciseImage}
                  resizeMode="cover"
                />
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseReps}>
                    {exercise.sets} Sets x {exercise.reps} Reps
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
