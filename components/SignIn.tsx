import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../app/types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SignIn = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const scrollOffsetValue = useSharedValue<number>(0);

  const carouselImages = [
    require("../assets/images/1.png"),
    require("../assets/images/2.png"),
    require("../assets/images/3.png"),
  ];

  const Logo = require("../assets/images/Group 18337.png");

  const renderCarouselItem = ({ item }: { item: any }) => {
    return (
      <ImageBackground
        source={item}
        resizeMode="cover"
        style={styles.carouselImage}
      />
    );
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  return (
    
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
      // keyboardVerticalOffset={Platform.OS === "ios" ? -120 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width}
              height={height * 0.67}
              autoPlay={false}
              data={carouselImages}
              scrollAnimationDuration={1000}
              onProgressChange={(offset) => {
                scrollOffsetValue.value = offset;
              }}
              renderItem={renderCarouselItem}
              defaultIndex={0}
            />
            <View style={styles.logoContainer}>
              <Image source={Logo} />
            </View>
          </View>

          <View style={styles.formOuterContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.subtitleText}>
                  Enter your mobile number to get OTP
                </Text>

                <View style={styles.phoneInputContainer}>
                  <View style={styles.flagContainer}>
                    <Image
                      source={{ uri: "https://flagcdn.com/w20/in.png" }}
                      style={styles.flag}
                    />
                    <Text style={styles.countryCode}>+91</Text>
                  </View>
                  <TextInput
                    placeholder="Enter Phone Number"
                    style={styles.phoneInput}
                    keyboardType="phone-pad"
                    placeholderTextColor="#666"
                  />
                </View>

                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={() => navigation.navigate('Verification')}
                >
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    flexGrow: 3,
  },
  carouselContainer: {
    height: "55%",
    position: "relative",
  },
  formOuterContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollView: {
    flex: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  carouselImage: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    left: 20,
    top: 60,
    zIndex: 1,
  },
  logoText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
    paddingTop: 30,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitleText: {
    color: "#666",
    marginBottom: 25,
  },
  phoneInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    height: 50,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  flag: {
    width: 20,
    height: 15,
    marginRight: 5,
  },
  countryCode: {
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 25,
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  
});

export default SignIn;
