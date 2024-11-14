import React from 'react';
import { View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { Image } from "expo-image";
import { router } from "expo-router";
import { Activity } from 'iconsax-react-native';

const GymWorkout: React.FC = () => {
  const handlePress = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Chest.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Chest Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>12 Excercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Back.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Back Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>12 Exercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Shoulder.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Shoulder Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>8 Exercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Biceps.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Biceps Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>10 Excercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Triceps.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Triceps Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>10 Excercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Legs.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Legs Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>10 Excercise</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => handlePress("/excercisePage")}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/Abs.svg")}
                  style={styles.rectangleCard}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Abs Workout</Text>
                  <View style={styles.cardTextRow}>
                    <Activity size={24} color="#000000" />
                    <Text style={styles.cardText}>10 Excercise</Text>
                  </View>
                </View>
              </View>
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
  grid: {
    flexDirection: 'column',
    padding: 10,
  },
  gridItem: {
    width: "100%",
    padding: 8,
    alignItems: 'center',
  },
  imageContainer: {
    width: "100%",
    position: 'relative',
  },
  rectangleCard: {
    width: "100%",
    height: undefined,
    aspectRatio: 3.6,
    borderRadius: 20,
  },
  cardTextContainer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },
  cardTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
  },
});

export default GymWorkout;
