import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { router } from "expo-router";
import { Image } from "expo-image";

const SignIn = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const scrollOffsetValue = useSharedValue<number>(0);

  const carouselImages = [
    require("@/assets/images/1.png"),
    require("@/assets/images/2.png"),
    require("@/assets/images/3.png"),
  ];

  const Logo = require("@/assets/images/gymmeLogo.svg");

  const renderCarouselItem = ({ item }: { item: any }) => {
    return (
      <ImageBackground
        source={item}
        resizeMode="cover"
        style={styles.carouselImage}
      />
    );
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handlePhoneNumberChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    setPhoneNumber(cleanedText);

    if (cleanedText.length === 10) {
      setError("");
    } else {
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  function handleSignInPress() {
    setLoading(true);

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    // Simply navigate to verification screen with the phone number
    router.replace({
      pathname: "/verification",
      params: { phoneNumber: `+91${phoneNumber}` },
    });

    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
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
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  style={[
                    styles.signInButton,
                    {
                      backgroundColor:
                        phoneNumber.length === 10 ? "#000" : "#ccc",
                    },
                  ]}
                  onPress={handleSignInPress}
                  disabled={phoneNumber.length !== 10}
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  signInButton: {
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













// import React, { useState, useContext, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Dimensions,
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import { useSharedValue } from "react-native-reanimated";
// // import { RootStackParamList } from "../app/types";
// import { router } from "expo-router";
// import { supabase } from "../lib/supabase";
// import { LoginContext } from "@/contexts/loginContext";
// import { Image } from "expo-image";
//
// const SignIn = () => {
//   const width = Dimensions.get("window").width;
//   const height = Dimensions.get("window").height;
//   const [loading, setLoading] = useState(false);
//   const scrollOffsetValue = useSharedValue<number>(0);
//   const { setIsLoggedIn } = useContext(LoginContext);
//
//   useEffect(() => {
//     async function logout() {
//       await supabase.auth.signOut();
//       setIsLoggedIn(false);
//     }
//     logout();
//   }, []);
//
//   const carouselImages = [
//     require("@/assets/images/1.png"),
//     require("@/assets/images/2.png"),
//     require("@/assets/images/3.png"),
//   ];
//
//   const Logo = require("@/assets/images/gymmeLogo.svg");
//
//   const renderCarouselItem = ({ item }: { item: any }) => {
//     return (
//       <ImageBackground
//         source={item}
//         resizeMode="cover"
//         style={styles.carouselImage}
//       />
//     );
//   };
//
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [error, setError] = useState("");
//
//   const handlePhoneNumberChange = (text: string) => {
//     const cleanedText = text.replace(/\D/g, "");
//     setPhoneNumber(cleanedText);
//
//     if (cleanedText.length === 10) {
//       setError("");
//     } else {
//       setError("Please enter a valid 10-digit phone number.");
//     }
//   };
//
//   async function handleSignInPress() {
//     setLoading(true);
//
//     if (phoneNumber.length !== 10) {
//       setError("Please enter a valid 10-digit phone number.");
//       setLoading(false);
//       return;
//     }
//
//     try {
//       const { data: existingUser, error: checkError } = await supabase
//         .from("user_profiles")
//         .select("*")
//         .eq("phone_number", phoneNumber)
//         .single();
//
//       if (checkError && checkError.code !== "PGRST116") {
//         console.error("Error checking existing user:", checkError);
//         setError("Failed to verify phone number. Please try again.");
//         setLoading(false);
//         return;
//       }
//
//       if (!existingUser) {
//         const { error: insertError } = await supabase
//           .from("user_profiles")
//           .insert({ phone_number: phoneNumber });
//
//         if (insertError) {
//           console.error("Error creating user profile:", insertError);
//           setError("Failed to create user profile. Please try again.");
//           setLoading(false);
//           return;
//         }
//       }
//
//       // Send OTP to the inputted phone number
//       const { data, error } = await supabase.auth.signInWithOtp({
//         phone: `+91${phoneNumber}`,
//       });
//
//       if (error) {
//         console.error("Error sending OTP:", error.message);
//         setError(error.message || "Failed to send OTP. Please try again.");
//         setLoading(false);
//         return;
//       }
//
//       // Navigate to verification, passing the phone number
//       router.replace({
//         pathname: "/verification",
//         params: { phoneNumber: `+91${phoneNumber}` },
//       });
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   return (
//     <KeyboardAvoidingView style={styles.mainContainer}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.mainContainer}>
//           <View style={styles.carouselContainer}>
//             <Carousel
//               loop
//               width={width}
//               height={height * 0.67}
//               autoPlay={false}
//               data={carouselImages}
//               scrollAnimationDuration={1000}
//               onProgressChange={(offset) => {
//                 scrollOffsetValue.value = offset;
//               }}
//               renderItem={renderCarouselItem}
//               defaultIndex={0}
//             />
//             <View style={styles.logoContainer}>
//               <Image source={Logo} />
//             </View>
//           </View>
//
//           <View style={styles.formOuterContainer}>
//             <ScrollView
//               style={styles.scrollView}
//               contentContainerStyle={styles.scrollViewContent}
//               bounces={false}
//               showsVerticalScrollIndicator={false}
//               keyboardShouldPersistTaps="handled"
//             >
//               <View style={styles.formContainer}>
//                 <Text style={styles.welcomeText}>Welcome!</Text>
//                 <Text style={styles.subtitleText}>
//                   Enter your mobile number to get OTP
//                 </Text>
//
//                 <View style={styles.phoneInputContainer}>
//                   <View style={styles.flagContainer}>
//                     <Image
//                       source={{ uri: "https://flagcdn.com/w20/in.png" }}
//                       style={styles.flag}
//                     />
//                     <Text style={styles.countryCode}>+91</Text>
//                   </View>
//                   <TextInput
//                     placeholder="Enter Phone Number"
//                     style={styles.phoneInput}
//                     keyboardType="phone-pad"
//                     placeholderTextColor="#666"
//                     value={phoneNumber}
//                     onChangeText={handlePhoneNumberChange}
//                   />
//                 </View>
//                 {error ? <Text style={styles.errorText}>{error}</Text> : null}
//
//                 <TouchableOpacity
//                   style={[
//                     styles.signInButton,
//                     {
//                       backgroundColor:
//                         phoneNumber.length === 10 ? "#000" : "#ccc",
//                     },
//                   ]}
//                   onPress={handleSignInPress}
//                   disabled={phoneNumber.length !== 10}
//                 >
//                   <Text style={styles.signInText}>Sign In</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     flexGrow: 3,
//   },
//   carouselContainer: {
//     height: "55%",
//     position: "relative",
//   },
//   formOuterContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   scrollView: {
//     flex: 0,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   carouselImage: {
//     flex: 1,
//     width: "100%",
//   },
//   logoContainer: {
//     position: "absolute",
//     left: 20,
//     top: 60,
//     zIndex: 1,
//   },
//   logoText: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   formContainer: {
//     padding: 20,
//     paddingTop: 30,
//     flex: 1,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subtitleText: {
//     color: "#666",
//     marginBottom: 25,
//   },
//   phoneInputContainer: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     marginBottom: 20,
//     alignItems: "center",
//     height: 50,
//   },
//   flagContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: 15,
//     paddingRight: 10,
//     borderRightWidth: 1,
//     borderRightColor: "#ddd",
//   },
//   flag: {
//     width: 20,
//     height: 15,
//     marginRight: 5,
//   },
//   countryCode: {
//     color: "#333",
//   },
//   phoneInput: {
//     flex: 1,
//     paddingHorizontal: 25,
//     color: "#333",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
//   signInButton: {
//     borderRadius: 8,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   signInText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
//
// export default SignIn;
