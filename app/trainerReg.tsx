import React, { useState, useContext } from "react";
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
import { Dropdown } from "react-native-paper-dropdown";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { LoginContext } from "@/contexts/loginContext";
import { Avatar } from "react-native-paper";

const OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const Trainer: React.FC = () => {
  const [formData, setFormData] = useState({
    dob: new Date(),
    gender: "",
    height: "",
    weight: "",
    name: "",
    mobileNumber: "",
    emailId: "",
    certificate: "",
  });

  const { setIsLoggedIn } = useContext(LoginContext);

  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
  };

  const handleSubmit = () => {
    setIsLoggedIn(true);
    router.replace("/trainerHome");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Avatar.Image size={88} style={styles.avatar} source={require("../assets/images/2.png")} />
        <Text style={styles.subtitle}>Upload Photo</Text>
        <Text style={styles.fieldLabel}>Name</Text>
        <TextInput
          mode="outlined"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your name"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />
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

        <Text style={styles.fieldLabel}>Mobile Number</Text>
        <TextInput
          mode="outlined"
          value={formData.mobileNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, mobileNumber: text })
          }
          placeholder="+91"
          keyboardType="phone-pad"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />

        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          mode="outlined"
          value={formData.emailId}
          onChangeText={(text) => setFormData({ ...formData, emailId: text })}
          placeholder="abc@gmail.com"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />

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
            <Text style={styles.fieldLabel}>Expertise</Text>
            <TextInput
              mode="outlined"
              value={formData.height}
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
              placeholder=" "
              keyboardType="numeric"
              outlineColor="rgba(0, 0, 0, 0.2)"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Years of experience</Text>
            <TextInput
              mode="outlined"
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              placeholder=" "
              keyboardType="numeric"
              outlineColor="rgba(0, 0, 0, 0.2)"
            />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Certificate</Text>
        <TextInput
          mode="outlined"
          value={formData.certificate}
          onChangeText={(text) =>
            setFormData({ ...formData, certificate: text })
          }
          placeholder="Add certificate details"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />
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
      <Text style={styles.submitButtonText}>Register Now</Text>
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
    fontSize: 16,
    color: "#000",
    marginBottom: 0,
    alignSelf: "center",
  },
  avatar: {
    marginVertical: 16,
    alignSelf: "center",
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 24,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  halfWidth: {
    flex: 1,
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
});

export default Trainer;
