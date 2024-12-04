import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { LoginContext } from "@/contexts/loginContext";
import { supabase } from "@/lib/supabase";

const OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    dob: new Date(),
    gender: "",
    height: "",
    weight: "",
    foodPreference: "Non-Vegetarian",
    bodyType: "Fit",
    fitnessLevel: "Intermediate",
    fitnessGoals: "Fitness",
  });

  const { setIsLoggedIn } = useContext(LoginContext);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bodyTypes = ["Lean", "Fit", "Obsessed"];
  const fitnessLevels = ["Beginner", "Intermediate", "Professional"];
  const fitnessGoals = ["Weight Loss", "Weight Gain", "Fitness"];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
  };

  const renderSelectionButtons = (
    options: string[],
    selectedValue: string,
    field: keyof typeof formData,
  ) => {
    return (
      <View style={styles.buttonContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectionButton,
              formData[field] === option && styles.selectedButton,
              formData[field] === option &&
                option === "Vegetarian" &&
                styles.greenButton,
              formData[field] == option &&
                option === "Eggetarian" &&
                styles.greenButton,
              formData[field] == option &&
                option === "Non-Vegetarian" &&
                styles.greenButton,
              formData[field] === option &&
                option === "Beginner" &&
                styles.yellowButton,
              formData[field] === option &&
                option === "Intermediate" &&
                styles.yellowButton,
              formData[field] === option &&
                option === "Professional" &&
                styles.yellowButton,
              formData[field] === option &&
                option === "Weight Loss" &&
                styles.purpleButton,
              formData[field] === option &&
                option === "Weight Gain" &&
                styles.purpleButton,
              formData[field] === option &&
                option === "Fitness" &&
                styles.purpleButton,
            ]}
            onPress={() => setFormData({ ...formData, [field]: option })}
          >
            <Text
              style={[
                styles.buttonText,
                formData[field] === option && styles.selectedButtonText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmit = async () => {
    try {
      // Get the current user from Supabase authentication
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("No authenticated user found");
      }

      // Prepare the user data object to insert into the database
      const userData = {
        user_id: user.id, // Ensure this matches exactly with the authenticated user's ID
        dob: formData.dob.toISOString(),
        gender: formData.gender,
        height: parseFloat(formData.height) || null, // Use null if parsing fails
        weight: parseFloat(formData.weight) || null,
        food_preference: formData.foodPreference,
        body_type: formData.bodyType,
        fitness_level: formData.fitnessLevel,
        fitness_goals: formData.fitnessGoals,
        created_at: new Date().toISOString(),
      };

      // Insert user details into the 'user_profiles' table
      const { data, error } = await supabase
        .from("user_profiles")
        .insert(userData)
        .select();

      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }

      // Update login state and navigate
      setIsLoggedIn(true);
      router.replace("/");

      console.log("User profile created successfully:", data);
    } catch (error) {
      console.error("Error submitting user details:", error);
      // Optional: Add more specific error handling
      Alert.alert("Error", "Failed to submit user details. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Add details</Text>
        <Text style={styles.subtitle}>Enter height, weight, dob etc.</Text>
        <Text style={styles.fieldLabel}>DOB</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            mode="outlined"
            value={formData.dob.toLocaleDateString()}
            editable={false}
            left={<TextInput.Icon icon="calendar" color="#007AFF" size={30} />}
            outlineColor="rgba(0, 0, 0, 0.2)"
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.dob}
            mode="date"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.fieldLabel}>Gender</Text>
        <Dropdown
          mode="outlined"
          value={formData.gender}
          onSelect={(text) =>
            setFormData({ ...formData, gender: text || "male" })
          }
          options={OPTIONS}
          placeholder="Male"
          menuDownIcon={
            <TextInput.Icon icon="chevron-down" color="#666" size={35} />
          }
        />

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Height</Text>
            <TextInput
              mode="outlined"
              value={formData.height}
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
              placeholder="Enter height (m)"
              keyboardType="numeric"
              left={<TextInput.Icon icon="human-male-height" color="#007AFF" />}
              outlineColor="rgba(0, 0, 0, 0.2)"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Weight</Text>
            <TextInput
              mode="outlined"
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              placeholder="Enter weight (kg)"
              keyboardType="numeric"
              left={<TextInput.Icon icon="weight" color="#4CAF50" />}
              outlineColor="rgba(0, 0, 0, 0.2)"
            />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Food preferences</Text>
        {renderSelectionButtons(
          foodPreferences,
          formData.foodPreference,
          "foodPreference",
        )}

        <Text style={styles.fieldLabel}>Body type</Text>
        {renderSelectionButtons(bodyTypes, formData.bodyType, "bodyType")}

        <Text style={styles.fieldLabel}>Fitness level</Text>
        {renderSelectionButtons(
          fitnessLevels,
          formData.fitnessLevel,
          "fitnessLevel",
        )}
        <Text style={styles.fieldLabel}>Fitness Goals</Text>
        {renderSelectionButtons(
          fitnessGoals,
          formData.fitnessGoals,
          "fitnessGoals",
        )}
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <View style={styles.partition} />
        <SubmitButton onPress={handleSubmit} />
      </View>
    </View>
  );
};

const SubmitButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  halfWidth: {
    flex: 1,
  },
  selectionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
  },
  greenButton: {
    backgroundColor: "#4CAF50",
  },
  redButton: {
    backgroundColor: "red",
  },
  blueButton: {
    backgroundColor: "#2196F3",
  },
  yellowButton: {
    backgroundColor: "#FFC107",
  },
  purpleButton: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "#666",
  },
  selectedButtonText: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonContainer: {
    position: "relative",
    backgroundColor: "transparent",
    top: 10,
  },
  partition: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  fitnessLevelContainer: {
    marginBottom: 16, // Add margin to create space between fitness level buttons and submit button
  },
});

export default Registration;
