import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
  isLive?: boolean;
  isRecorded?: boolean;
  onPress?: () => void;
}

const Service: React.FC<ServiceProps> = ({
  icon,
  title,
  description,
  isLive,
  isRecorded,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.service}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.iconContainer}>
      <FontAwesome5 name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.serviceContent}>
      <Text style={styles.serviceTitle}>{title}</Text>
      {description ? (
        <Text style={styles.serviceDescription}>{description}</Text>
      ) : null}
    </View>
    {isLive && (
      <View style={styles.liveIndicator}>
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    )}
    {isRecorded && (
      <View style={styles.recordedIndicator}>
        <Text style={styles.recordedText}>REC</Text>
      </View>
    )}
  </TouchableOpacity>
);

const ServicesScreen: React.FC = () => {
  const services: ServiceProps[] = [
    {
      icon: "dumbbell",
      title: "Live Personal Training",
      description: "Start your training journey with expert guidance",
      isLive: true,
    },
    {
      icon: "video",
      title: "Recorded Home Workout",
      description: "Access premium workout videos for free!",
      isRecorded: true,
    },
    {
      icon: "user-tie",
      title: "Personal Training @Nearby Gym",
      description: "Train with professionals at your local gym",
    },
    {
      icon: "utensils",
      title: "Diet Planning",
      description: "Personalized nutrition plans for your goals",
    },
    {
      icon: "fire",
      title: "Calorie Counter",
      description: "Track your daily calorie intake easily",
    },
    {
      icon: "user-clock",
      title: "Decode Age (Forever Young)",
      description: "Age-specific fitness programs",
    },
    {
      icon: "home",
      title: "Fitness Trainer @Home",
      description: "Expert training in the comfort of your home",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services</Text>
      <View style={styles.separator} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {services.map((service, index) => (
          <Service
            key={index}
            {...service}
            onPress={() => console.log(`Selected service: ${service.title}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  service: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceContent: {
    flex: 1,
    marginLeft: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
  },
  liveIndicator: {
    backgroundColor: "#ff3b30",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  liveText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  recordedIndicator: {
    backgroundColor: "#007AFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  recordedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ServicesScreen;
