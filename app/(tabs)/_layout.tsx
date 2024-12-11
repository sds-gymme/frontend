import { Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Home2,
  Home,
  BrifecaseTimer,
  Timer1,
  Profile,
  ProfileCircle,
} from "iconsax-react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoginContext } from "@/contexts/loginContext";
import { Redirect, useRootNavigationState } from "expo-router";

// Custom TabBarIcon component using Iconsax
const TabBarIcon = ({
  focused,
  color,
  FilledIcon,
  OutlineIcon,
}: {
  focused: boolean;
  color: string;
  FilledIcon: typeof Home2;
  OutlineIcon: typeof Home;
}) => {
  const IconComponent = focused ? FilledIcon : OutlineIcon;
  return (
    <IconComponent
      size={24}
      color={color}
      variant={focused ? "Bold" : "Linear"}
    />
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useContext(LoginContext);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    console.log("LOGGED IN 1 - ", isLoggedIn);
  }, [isLoggedIn]);

  if (!rootNavigationState?.key) return null;

  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn === false) {
    console.log("LOGGED IN 2 - ", isLoggedIn);
    return <Redirect href={"/signin"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              FilledIcon={Home2}
              OutlineIcon={Home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              FilledIcon={BrifecaseTimer}
              OutlineIcon={BrifecaseTimer}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              FilledIcon={Timer1}
              OutlineIcon={Timer1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              FilledIcon={ProfileCircle}
              OutlineIcon={Profile}
            />
          ),
        }}
      />
    </Tabs>
  );
}
