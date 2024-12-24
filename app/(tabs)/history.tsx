import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import HistoryCard from "@/components/HistoryCard";
import { supabase } from "@/lib/supabase";

const sampleHistoryData = [
  {
    date: "3 Jun 2024",
    activityName: "Live Personal Training",
    gymName: "Fitness More",
    duration: 45,
    price: 199,
    isLiveSession: true,
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
  {
    date: "20 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Fitflit Gym",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
  {
    date: "25 May 2024",
    activityName: "Personal Training @Gym",
    gymName: "Ultra fitness",
    duration: 45,
    price: 199,
    isLiveSession: false,
  },
];

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState(sampleHistoryData);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("No authenticated user found");
      }

      try {
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

        // Format data
        const formattedTrainerData = trainerData.map((order) => ({
          date: new Date(order.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          activityName: "Live Personal Training",
          gymName: null,
          duration: 45, // Assuming fixed duration
          price: parseFloat(order.amount),
          isLiveSession: true,
        }));

        const formattedGymData = gymData.map((order) => ({
          date: new Date(order.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          activityName: "Gym Session",
          gymName: order.gym_name,
          duration: 60, // Assuming fixed duration
          price: parseFloat(order.amount),
          isLiveSession: false,
        }));

        // Combine and set history data
        const combinedHistoryData = [
          ...formattedTrainerData,
          ...formattedGymData,
        ];
        setHistoryData(combinedHistoryData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
