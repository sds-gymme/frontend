import { Text, View } from 'react-native'
import React, { Component } from 'react'
import VerificationScreen from '@/components/Verification'
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

export default function Verification() {

  const Stack = createStackNavigator(); 

    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <Stack.Navigator initialRouteName="Verification">
          <Stack.Screen 
          name=" " 
          options={{headerTitle: " "}} 
          component={VerificationScreen} 
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    );
}
