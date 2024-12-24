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
    name: "",
    gender: "",
    height: "",
    weight: "",
    foodPreference: "Non-Vegetarian",
    bodyType: "Fit",
    fitnessLevel: "Intermediate",
    fitnessGoals: "Fitness",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setIsLoggedIn } = useContext(LoginContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");

  const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bodyTypes = ["Lean", "Fit", "Obsessed"];
  const fitnessLevels = ["Beginner", "Intermediate", "Professional"];
  const fitnessGoals = ["Weight Loss", "Weight Gain", "Fitness"];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Validate height
    if (!formData.height) {
      newErrors.height = "Height is required";
    } else if (
      isNaN(parseFloat(formData.height)) ||
      parseFloat(formData.height) <= 0
    ) {
      newErrors.height = "Please enter a valid height";
    }

    // Validate weight
    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    } else if (
      isNaN(parseFloat(formData.weight)) ||
      parseFloat(formData.weight) <= 0
    ) {
      newErrors.weight = "Please enter a valid weight";
    }

    // Set errors and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
  };

  const renderError = (fieldName: string) => {
    return errors[fieldName] ? (
      <Text style={styles.errorText}>{errors[fieldName]}</Text>
    ) : null;
  };

  const renderSelectionButtons = (
    options: string[],
    selectedValue: string,
    field: keyof typeof formData
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
              formData[field] === option &&
                option === "Eggetarian" &&
                styles.greenButton,
              formData[field] === option &&
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
    if (!validateForm()) {
      Alert.alert(
        "Required Fields",
        "Please fill in all required fields correctly before submitting."
      );
      return;
    }

    setSubmitButtonText("Submitting");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("No authenticated user found");
      }

      const userData = {
        user_id: user.id,
        user_name: formData.name,
        dob: formData.dob.toISOString(),
        gender: formData.gender,
        height: parseFloat(formData.height) || null,
        weight: parseFloat(formData.weight) || null,
        food_preference: formData.foodPreference,
        body_type: formData.bodyType,
        fitness_level: formData.fitnessLevel,
        fitness_goals: formData.fitnessGoals,
        created_at: new Date().toISOString(),
      };

      const { data: existingData, error } = await supabase
        .from("user_profiles")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }

      if (existingData.length > 0) {
        const { data, error } = await supabase
          .from("user_profiles")
          .update(userData)
          .eq("user_id", user.id)
          .select();

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
      } else {
        const { data, error } = await supabase
          .from("user_profiles")
          .insert(userData)
          .select();

        if (error) {
          console.error("Supabase insertion error:", error);
          throw error;
        }
      }

      setIsLoggedIn(true);
      router.replace("/");
    } catch (error) {
      console.error("Error submitting user details:", error);
      Alert.alert("Error", "Failed to submit user details. Please try again.");
    } finally {
      setSubmitButtonText("Submit");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Add details</Text>
        <Text style={styles.subtitle}>
          Enter name, height, weight, dob etc.
        </Text>

        <Text style={styles.fieldLabel}>Name *</Text>
        <TextInput
          mode="outlined"
          value={formData.name}
          onChangeText={(text) => {
            setFormData({ ...formData, name: text });
            setErrors({ ...errors, name: "" });
          }}
          placeholder="Enter your name"
          keyboardType="default"
          outlineColor={errors.name ? "red" : "rgba(0, 0, 0, 0.2)"}
        />
        {renderError("name")}

        <Text style={styles.fieldLabel}>DOB *</Text>
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

        <Text style={styles.fieldLabel}>Gender *</Text>
        <Dropdown
          mode="outlined"
          value={formData.gender}
          onSelect={(text) => {
            setFormData({ ...formData, gender: text || "male" });
            setErrors({ ...errors, gender: "" });
          }}
          options={OPTIONS}
          placeholder="Select gender"
          menuDownIcon={
            <TextInput.Icon icon="chevron-down" color="#666" size={35} />
          }
        />
        {renderError("gender")}

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Height *</Text>
            <TextInput
              mode="outlined"
              value={formData.height}
              onChangeText={(text) => {
                setFormData({ ...formData, height: text });
                setErrors({ ...errors, height: "" });
              }}
              placeholder="Enter height (m)"
              keyboardType="numeric"
              left={<TextInput.Icon icon="human-male-height" color="#007AFF" />}
              outlineColor={errors.height ? "red" : "rgba(0, 0, 0, 0.2)"}
            />
            {renderError("height")}
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Weight *</Text>
            <TextInput
              mode="outlined"
              value={formData.weight}
              onChangeText={(text) => {
                setFormData({ ...formData, weight: text });
                setErrors({ ...errors, weight: "" });
              }}
              placeholder="Enter weight (kg)"
              keyboardType="numeric"
              left={<TextInput.Icon icon="weight" color="#4CAF50" />}
              outlineColor={errors.weight ? "red" : "rgba(0, 0, 0, 0.2)"}
            />
            {renderError("weight")}
          </View>
        </View>

        <Text style={styles.fieldLabel}>Food preferences *</Text>
        {renderSelectionButtons(
          foodPreferences,
          formData.foodPreference,
          "foodPreference"
        )}

        <Text style={styles.fieldLabel}>Body type *</Text>
        {renderSelectionButtons(bodyTypes, formData.bodyType, "bodyType")}

        <Text style={styles.fieldLabel}>Fitness level *</Text>
        {renderSelectionButtons(
          fitnessLevels,
          formData.fitnessLevel,
          "fitnessLevel"
        )}

        <Text style={styles.fieldLabel}>Fitness Goals *</Text>
        {renderSelectionButtons(
          fitnessGoals,
          formData.fitnessGoals,
          "fitnessGoals"
        )}
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <View style={styles.partition} />
        <SubmitButton onPress={handleSubmit} text={submitButtonText} />
      </View>
    </View>
  );
};

const SubmitButton: React.FC<{ onPress: () => void; text: string }> = ({
  onPress,
  text,
}) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{text}</Text>
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
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default Registration;
