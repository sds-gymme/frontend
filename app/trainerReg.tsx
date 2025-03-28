import React, { useState, useContext, useEffect } from "react";
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
import { Avatar } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const Trainer: React.FC = () => {
  const [formData, setFormData] = useState({
    dob: new Date(),
    gender: "",
    expertise: "",
    years: "",
    name: "",
    mobile_number: "",
    email_id: "",
    certificate: "",
    about: "",
    price: "0",
    location: "",
  });

  const { setIsLoggedIn } = useContext(LoginContext);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
  };

  const handleSubmit = async () => {
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
        name: formData.name,
        dob: formData.dob.toISOString(),
        gender: formData.gender,
        expertise: formData.expertise,
        years: formData.years,
        mobile_number: formData.mobile_number,
        email_id: formData.email_id,
        certificate: formData.certificate,
        about: formData.about,
        price: formData.price,
        location: formData.location,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("trainer_profiles")
        .select()
        .eq("user_id", user.id);
      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }
      if (data.length > 0) {
        const { data, error } = await supabase
          .from("trainer_profiles")
          .update(userData)
          .eq("user_id", user.id)
          .select();

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
      } else {
        const { data, error } = await supabase
          .from("trainer_profiles")
          .insert(userData)
          .select();

        if (error) {
          console.error("Supabase insertion error:", error);
          throw error;
        }
      }

      // const { data, error } = await supabase
      //   .from("user_profiles")

      //   .insert(userData)
      //   .select();

      // if (error) {
      //   console.error("Supabase insertion error:", error);
      //   throw error;
      // }

      setIsLoggedIn(true);
      router.replace("/trainerHome");
      try {
        await AsyncStorage.setItem("userType", "trainer");
      } catch (e) {
        console.error("Error storing user type in async storage:", e);
      }

      console.log("User profile created successfully:", data);
    } catch (error) {
      console.error("Error submitting user details:", error);
      Alert.alert("Error", "Failed to submit user details. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTrainer = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .from("trainer_profiles")
        .select()
        .eq("user_id", user.id)
        .single();
      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }

      if (data) {
        let { dob, price, years, mobile_number, ...rest } = data;
        dob = new Date(dob);
        price = price.toString();
        years = years.toString();
        mobile_number = mobile_number.toString();
        setFormData({ ...rest, dob, price, years, mobile_number });
      }
    };
    fetchTrainer();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Avatar.Image
          size={88}
          style={styles.avatar}
          source={require("../assets/images/2.png")}
        />
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
          value={formData.mobile_number}
          onChangeText={(text) =>
            setFormData({ ...formData, mobile_number: text })
          }
          placeholder="+91"
          keyboardType="phone-pad"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />

        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          mode="outlined"
          value={formData.email_id}
          onChangeText={(text) => setFormData({ ...formData, email_id: text })}
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
              value={formData.expertise}
              onChangeText={(text) =>
                setFormData({ ...formData, expertise: text })
              }
              placeholder=" "
              outlineColor="rgba(0, 0, 0, 0.2)"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.fieldLabel}>Years of experience</Text>
            <TextInput
              mode="outlined"
              value={formData.years}
              onChangeText={(text) => setFormData({ ...formData, years: text })}
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

        <Text style={styles.fieldLabel}>About</Text>
        <TextInput
          mode="outlined"
          value={formData.about}
          onChangeText={(text) => setFormData({ ...formData, about: text })}
          placeholder="Add about"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />

        <Text style={styles.fieldLabel}>Price</Text>
        <TextInput
          mode="outlined"
          value={formData.price}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          placeholder="Add price"
          keyboardType="numeric"
          outlineColor="rgba(0, 0, 0, 0.2)"
        />

        <Text style={styles.fieldLabel}>Location</Text>
        <TextInput
          mode="outlined"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholder="Your Location"
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
