import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Clock,
  MessageQuestion,
  Card,
  Setting,
  InfoCircle,
  Star,
  User,
  UserAdd,
  LogoutCurve,
  ArrowRight2,
} from "iconsax-react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showBorder?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  onPress,
  showBorder = true,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, showBorder && styles.menuItemBorder]}
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      {icon}
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <ArrowRight2 size={20} color="#666" />
  </TouchableOpacity>
);

const AccountPage: React.FC = () => {
  const handlePress = (action: string) => {
    console.log(`${action} pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerText}>Account</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.profileSection}
            onPress={() => handlePress("Edit Profile")}
          >
            <View style={styles.profileLeft}>
              <User size={50} color="#666" />
              <View>
                <Text style={styles.profileName}>Pravesh Mankar</Text>
                <Text style={styles.profileEdit}>Edit Profile</Text>
              </View>
            </View>
            <ArrowRight2 size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.menuCard]}>
          <MenuItem
            icon={<Clock size={24} color="#666" />}
            title="History"
            onPress={() => handlePress("History")}
          />
          <MenuItem
            icon={<MessageQuestion size={24} color="#666" />}
            title="Help Center"
            onPress={() => handlePress("Help Center")}
          />
          <MenuItem
            icon={<Card size={24} color="#666" />}
            title="Manage Payments"
            onPress={() => handlePress("Manage Payments")}
          />
          <MenuItem
            icon={<Setting size={24} color="#666" />}
            title="Settings"
            onPress={() => handlePress("Settings")}
          />
          <MenuItem
            icon={<InfoCircle size={24} color="#666" />}
            title="About Gymme"
            onPress={() => handlePress("About")}
          />
          <MenuItem
            icon={<Star size={24} color="#666" />}
            title="Ratings"
            onPress={() => handlePress("Ratings")}
          />
          <MenuItem
            icon={<UserAdd size={24} color="#666" />}
            title="Referral Programs"
            onPress={() => handlePress("Referral")}
          />
          <MenuItem
            icon={<User size={24} color="#666" />}
            title="Switch to Trainer"
            onPress={() => handlePress("Switch to Trainer")}
            showBorder={false}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handlePress("Logout")}
        >
          <LogoutCurve size={24} color="#666" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 16,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  profileEdit: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  menuCard: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: "100%",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
});

export default AccountPage;
