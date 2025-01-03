import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Call } from "iconsax-react-native"; // Importing the phone icon

interface HistoryCardProps {
  date: string;
  activityName: string;
  gymName: string | null;
  duration: number;
  price: number;
  isLiveSession?: boolean;
  showCallButton?: boolean;
  onCallPress?: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  activityName,
  gymName,
  duration,
  price,
  isLiveSession = false,
  showCallButton = false,
  onCallPress,
}) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isLiveSession ? "#e3f2fd" : "#fff3e0" },
      ]}
    >
      <View style={styles.iconContainer}>
        {isLiveSession ? (
          <Image
            source={require("../assets/images/LivePersonalTraining.svg")}
            style={styles.activityIcon}
          />
        ) : (
          <Image
            source={require("../assets/images/PersonalTraining.svg")}
            style={styles.activityIcon}
          />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <View style={styles.textContainer}>
            <Text style={styles.activityText}>{activityName}</Text>
            <View style={styles.gymContainer}>
              <Image
                source={require("../assets/images/gymmeLogo.svg")}
                style={styles.gymIcon}
              />
              <Text style={styles.gymText}>{gymName}</Text>
            </View>
          </View>
          <Text style={styles.priceText}>₹{price}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.durationText}>{duration} min</Text>
        </View>

        {/* Call Button */}
        {showCallButton && (
          <TouchableOpacity style={styles.callButton} onPress={onCallPress}>
            <Call size={18} color="#fff" />
            <Text style={styles.callButtonText}>Call Instructor</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    flex: 1,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  gymContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gymIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  gymText: {
    fontSize: 14,
    color: "#666666",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666666",
  },
  durationText: {
    fontSize: 14,
    color: "#666666",
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 12, // Ensures spacing below the duration
    alignSelf: "flex-start", // Aligns button to the left
  },
  callButtonText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HistoryCard;
