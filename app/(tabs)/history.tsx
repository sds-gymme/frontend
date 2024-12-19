import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import HistoryCard from "@/components/HistoryCard";

const HistoryPage = () => {
  const historyData = [
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
