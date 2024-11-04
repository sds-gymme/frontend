import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

type RegistrationScreenProps = StackScreenProps<ParamListBase>;

const Registration: React.FC<RegistrationScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    dob: new Date(),
    gender: "",
    height: "",
    weight: "",
    foodPreference: "Non-Vegetarian",
    bodyType: "Fit",
    fitnessLevel: "Intermediate",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bodyTypes = ["Lean", "Fit", "Obsessed"];
  const fitnessLevels = ["Beginner", "Intermediate", "Professional"];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
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
              option === "Vegetarian" && styles.greenButton,
              option === "Lean" && styles.blueButton,
              option === "Beginner" && styles.yellowButton,
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

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    navigation.navigate("HomePage")
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Basic Information</Text>
      <Text style={styles.subtitle}>Add details</Text>
      <Text style={styles.fieldLabel}>DOB</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          mode="outlined"
          value={formData.dob.toLocaleDateString()}
          editable={false}
          right={<TextInput.Icon icon="calendar" />}
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
      <TextInput
        mode="outlined"
        value={formData.gender}
        onChangeText={(text) => setFormData({ ...formData, gender: text })}
        right={<TextInput.Icon icon="chevron-down" />}
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfWidth}>
          <Text style={styles.fieldLabel}>Height</Text>
          <TextInput
            mode="outlined"
            value={formData.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
            placeholder="Enter height (cm)"
            keyboardType="numeric"
            right={<TextInput.Icon icon="human-male-height" />}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.fieldLabel}>Weight</Text>
          <TextInput
            mode="outlined"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            placeholder="Enter weight (kg)"
            keyboardType="numeric"
            right={<TextInput.Icon icon="weight" />}
          />
        </View>
      </View>

      <Text style={styles.fieldLabel}>Food preferences</Text>
      {renderSelectionButtons(
        foodPreferences,
        formData.foodPreference,
        "foodPreference"
      )}

      <Text style={styles.fieldLabel}>Body type</Text>
      {renderSelectionButtons(bodyTypes, formData.bodyType, "bodyType")}

      <Text style={styles.fieldLabel}>Fitness level</Text>
      {renderSelectionButtons(
        fitnessLevels,
        formData.fitnessLevel,
        "fitnessLevel"
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
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
  blueButton: {
    backgroundColor: "#2196F3",
  },
  yellowButton: {
    backgroundColor: "#FFC107",
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
});

export default Registration;
