import React from 'react';
import { View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { Image } from "expo-image";
import { router } from "expo-router";


const RecordedHomeWorkout: React.FC = () => {
  const handlePress = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Exercise you're looking for today?</Text>
          <Text style={styles.subtitle}>Select at least one option to get started.</Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/gymWorkout")}>
              <Image
                source={require("@/assets/images/GymWorkout.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Gym Workout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/CardioWorkout.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Cardio Workout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/CrossFit.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>CrossFit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/Zumba.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Zumba</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/Aerobics.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Aerobics</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/Boxing.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Boxing</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/MMA.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>MMA</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <Image
                source={require("@/assets/images/Yoga.svg")}
                style={styles.squareCard}
              />
              <Text style={styles.cardText}>Yoga</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  squareCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
  },
  gridItem: {
    width: "45%", // Adjust width for better alignment
    padding: 8,
    alignItems: 'center', // Center align items
  },
  scrollContent: {
    padding: 16,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
});

export default RecordedHomeWorkout;
