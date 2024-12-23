import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { Play } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";

interface ExerciseDetailProps {
  navigation: any; // Replace with your navigation type
}
const baseImageURL =
  "https://xnjquyseausfrxytquvs.supabase.co/storage/v1/object/public/photos/";

const ExerciseDetailScreen: React.FC<ExerciseDetailProps> = ({
  navigation,
}) => {
  const { id } = useLocalSearchParams();

  const [exercise, setExercise] = useState<any>();

  useEffect(() => {
    const fetchExercise = async () => {
      let { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      setExercise(data);
    };
    fetchExercise();
  }, []);

  if (!exercise) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.videoContainer}>
          <Image
            src={baseImageURL + exercise.photo_name}
            style={styles.videoPreview}
          />
          {/* <TouchableOpacity style={styles.playButton}>
            <Play size={32} color="#FFF" />
          </TouchableOpacity> */}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How to {exercise.name}</Text>

          {exercise.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: width * 0.75,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  videoPreview: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  instructionsContainer: {
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingRight: 16,
  },
  stepNumber: {
    fontSize: 16,
    color: "#000000",
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
    lineHeight: 22,
  },
});

export default ExerciseDetailScreen;
