import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Switch, Text, useTheme, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OnlineOfflineToggle = ({
  onToggle,
}: {
  onToggle: (isOnline: boolean) => void;
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const theme = useTheme();

  const onToggleSwitch = () => {
    setIsOnline(!isOnline);
    onToggle(!isOnline);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <IconButton
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              name={isOnline ? "access-point" : "access-point-off"}
              size={size}
              color={isOnline ? theme.colors.primary : theme.colors.error}
            />
          )}
          size={30}
        />
        <View style={styles.textContainer}>
          <Text
            variant="titleMedium"
            style={{
              color: isOnline ? theme.colors.primary : theme.colors.error,
            }}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {isOnline
              ? "You are visible to others"
              : "You are not visible to others"}
          </Text>
        </View>
        <Switch value={isOnline} onValueChange={onToggleSwitch} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default OnlineOfflineToggle;
