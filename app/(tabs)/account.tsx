import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import {
  Profile,
  ArrowRight,
  Timer1,
  MessageQuestion,
  Card,
  Setting2,
  Information,
  Star1,
  UserAdd,
  UserOctagon,
  LogoutCurve
} from "iconsax-react-native";
import { LoginContext } from "@/contexts/loginContext";
import { supabase } from "@/lib/supabase";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showBorder?: boolean;
}

const handleTrainerPress = () => {
  router.replace("/trainerReg");
};


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
    <ArrowRight size={20} color="#666" variant="Linear" />
  </TouchableOpacity>
);

const AccountPage: React.FC = () => {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("No authenticated user found");
        }

        const { data, error } = await supabase
          .from("user_profiles")
          .select("user_name")
          .eq("user_id", user.id)
          .single();

        if (error) {
          throw error;
        }


        setUsername(data.user_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const handlePress = (route: any) => {
    router.push(route);
  };
  const { setIsLoggedIn } = useContext(LoginContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.profileSection}
            onPress={() => handlePress("/registration")}
          >
            <View style={styles.profileLeft}>
              <Profile size={50} color="#666" variant="Linear" />
              <View>
                <Text style={styles.profileName}>{username}</Text>
                <Text style={styles.profileEdit}>Edit Profile</Text>
              </View>
            </View>
            <ArrowRight size={20} color="#666" variant="Linear" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.menuCard]}>
          <MenuItem
            icon={<Timer1 size={24} color="#666" variant="Linear" />}
            title="History"
            onPress={() => handlePress("/history")}
          />
          <MenuItem
            icon={<MessageQuestion size={24} color="#666" variant="Linear" />}
            title="Help Center"
            onPress={() => handlePress("/helpCenter")}
          />
          <MenuItem
            icon={<Card size={24} color="#666" variant="Linear" />}
            title="Manage Payments"
            onPress={() => handlePress("/underdev")}
          />
          <MenuItem
            icon={<Setting2 size={24} color="#666" variant="Linear" />}
            title="Settings"
            onPress={() => handlePress("/registration")}
          />
          <MenuItem
            icon={<Information size={24} color="#666" variant="Linear" />}
            title="About Gymme"
            onPress={() => handlePress("/underdev")}
          />
          {/* <MenuItem */}
          {/*   icon={<Star1 size={24} color="#666" variant="Linear" />} */}
          {/*   title="Ratings" */}
          {/*   onPress={() => handlePress("/underdev")} */}
          {/* /> */}
          <MenuItem
            icon={<UserAdd size={24} color="#666" variant="Linear" />}
            title="Referral Programs"
            onPress={() => handlePress("/underdev")}
          />
          <MenuItem
            icon={<UserOctagon size={24} color="#666" variant="Linear" />}
            title="Switch to Trainer"
            onPress={() => handleTrainerPress()}
            showBorder={false}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setIsLoggedIn(false)}
        >
          <LogoutCurve size={24} color="#666" variant="Linear" />
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
