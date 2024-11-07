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
import { TextInput, Menu, Button } from "react-native-paper";
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
    fitnessGoals: "Fitness",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bodyTypes = ["Lean", "Fit", "Obsessed"];
  const fitnessLevels = ["Beginner", "Intermediate", "Professional"];
  const fitnessGoals = ["Weight Loss", "Weight Gain", "Fitness"];
  const genders = ["Male", "Female", "Other"];

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    navigation.navigate("Home");
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
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <TextInput
                mode="outlined"
                value={formData.gender}
                placeholder="Select Gender"
                editable={false}
                right={
                  <TextInput.Icon icon="chevron-down" color="#666" size={35} />
                }
                left={
                  <TextInput.Icon
                    icon="gender-male-female"
                    color="orange"
                    size={35}
                  />
                }
                outlineColor="rgba(0, 0, 0, 0.2)"
              />
            </TouchableOpacity>
          }
        >
          {genders.map((gender) => (
            <Menu.Item
              key={gender}
              onPress={() => {
                setFormData({ ...formData, gender });
                setMenuVisible(false);
              }}
              title={gender}
            />
          ))}
        </Menu>

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
    fontSize: 22,
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
});

export default Registration;
