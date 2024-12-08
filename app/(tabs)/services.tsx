import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";

// Import SVG contents
import {
  Services1,
  Services2,
  Services3,
  Services4,
  Services5,
  Services6,
  Services7,
} from "@/constants/SvgIcons";

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
      <SvgXml xml={icon} width={44} height={44} />
    </View>
    <View style={styles.serviceContent}>
      <Text style={styles.serviceTitle}>{title}</Text>
      {description ? (
        <Text style={styles.serviceDescription}>{description}</Text>
      ) : (
        ""
      )}
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
  const handlePress = (route: any) => {
    router.push(route);
  };

  const services: ServiceProps[] = [
    {
      icon: Services1,
      title: "Live Personal Training",
      description: "Start your training journey with expert guidance",
      isLive: true,
      onPress: () => handlePress("/livePersonalTraining"),
    },
    {
      icon: Services2,
      title: "Recorded Home Workout",
      description: "Access premium workout videos for free!",
      isRecorded: true,
      onPress: () => handlePress("/recordedHomeWorkout"),
    },
    {
      icon: Services3,
      title: "Personal Training @Nearby Gym",
      description: "Train with professionals at your local gym",
      onPress: () => handlePress("/underdev"),
    },
    {
      icon: Services4,
      title: "Diet Planning",
      description: "Personalized nutrition plans for your goals",
      onPress: () => handlePress("/underdev"),
    },
    {
      icon: Services5,
      title: "Calorie Counter",
      description: "Track your daily calorie intake easily",
      onPress: () => handlePress("/underdev"),
    },
    {
      icon: Services6,
      title: "Decode Age (Forever Young)",
      description: "Age-specific fitness programs",
      onPress: () => handlePress("/underdev"),
    },
    {
      icon: Services7,
      title: "Fitness Trainer @Home",
      description: "Expert training in the comfort of your home",
      onPress: () => handlePress("/underdev"),
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
          <Service key={index} {...service} />
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
    fontSize: 24,
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
