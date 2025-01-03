import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import HistoryCard from "@/components/HistoryCard";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface HistoryData {
  date: string;
  activityName: string;
  gymName: string | null;
  duration: number;
  price: number;
  isLiveSession: boolean;
  callStarted: boolean;
}

const sampleHistoryData: HistoryData[] = [
  {
    date: "3 Jun 2024",
    activityName: "Live Personal Training",
    gymName: "Fitness More",
    duration: 45,
    price: 199,
    isLiveSession: true,
    callStarted: false
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Ultra fitness",
    duration: 45,
    price: 199,
    isLiveSession: false,
    callStarted: false
  },
];

const HistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>(sampleHistoryData);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("No authenticated user found");
        }

        // Fetch data from `trainer_orders`
        const { data: trainerData, error: trainerError } = await supabase
          .from("trainer_orders")
          .select("*")
          .eq("user_id", user.id);

        if (trainerError) {
          console.error("Error fetching trainer orders:", trainerError.message);
          return;
        }

        // Fetch data from `gym_orders`
        const { data: gymData, error: gymError } = await supabase
          .from("gym_orders")
          .select("*")
          .eq("user_id", user.id);

        if (gymError) {
          console.error("Error fetching gym orders:", gymError.message);
          return;
        }

        // Format trainer data
        const formattedTrainerData: HistoryData[] = trainerData.map((order) => ({
          date: new Date(order.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          activityName: "Live Personal Training",
          gymName: null,
          duration: 45,
          price: parseFloat(order.amount),
          isLiveSession: true,
          callStarted: false
        }));

        // Format gym data
        const formattedGymData: HistoryData[] = gymData.map((order) => ({
          date: new Date(order.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          activityName: "Gym Session",
          gymName: order.gym_name,
          duration: 60,
          price: parseFloat(order.amount),
          isLiveSession: false,
          callStarted: false
        }));

        // Combine and set history data
        const combinedHistoryData = [
          ...formattedTrainerData,
          ...formattedGymData,
        ];
        setHistoryData(combinedHistoryData);
      } catch (error) {
        console.error("Error fetching history data:", error);
        Alert.alert("Error", "Unable to fetch history data");
      }
    };

    fetchHistoryData();
  }, []);

  const handleCallPress = async () => {
    try {
      await AsyncStorage.setItem("userType", "user");
      router.replace("/clientVideo");
    } catch (error) {
      Alert.alert("Error", "Failed to start the call");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {historyData.map((item, index) => (
          <HistoryCard
            key={index}
            date={item.date}
            activityName={item.activityName}
            gymName={item.gymName}
            duration={item.duration}
            price={item.price}
            showCallButton={item.isLiveSession && !item.callStarted}
            onCallPress={handleCallPress}
            isLiveSession={item.isLiveSession}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
});

export default HistoryPage;
