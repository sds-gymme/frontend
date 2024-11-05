// App.tsx

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Homepage from "../screens/HomePage"; // Adjust path if necessary
import Services from "../screens/Registration"; // Create this component
import History from "../screens/Verification"; // Create this component
import Account from "../screens/HomePage"; // Create this component

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#ffffff", // White background for the app
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000000", 
          tabBarInactiveTintColor: "#808080", 
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#eeeeee",
            paddingBottom: 8,
            height: 60,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="briefcase-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
