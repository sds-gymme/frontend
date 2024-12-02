import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});




// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   NativeSyntheticEvent,
//   TextInputKeyPressEventData,
// } from "react-native";
// import { router } from "expo-router";
// import { supabase } from "../lib/supabase";

// interface VerificationScreenProps {
//   phoneNumber?: string;
// }

// interface InputRefType extends TextInput {
//   focus(): void;
// }

// const VerificationScreen: React.FC<VerificationScreenProps> = ({
//   phoneNumber = "+918369535159",
// }) => {
//   const [code, setCode] = useState<string[]>(["", "", "", ""]);
//   const [timer, setTimer] = useState<number>(60);
//   const [error, setError] = useState<string>("");
//   const inputs = useRef<(InputRefType | null)[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleCodeChange = (text: string, index: number): void => {
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     if (text.length === 1 && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (index: number): void => {
//     if (index > 0 && code[index] === "") {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleVerify = async (): Promise<boolean> => {
//     try {
//       const verificationCode = code.join("");
//       console.log("Verifying code:", verificationCode);
//       if (verificationCode === "1234") {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       return false;
//     }
//   };

//   const handlePress = async () => {
//     const isVerified = await handleVerify();
//     if (isVerified) {
//       router.replace("/registration");
//     } else {
//       setError("Invalid verification code. Please try again.");
//     }
//   };

//   const handleKeyPress = (
//     index: number,
//     e: NativeSyntheticEvent<TextInputKeyPressEventData>,
//   ): void => {
//     if (e.nativeEvent.key === "Backspace") {
//       handleBackspace(index);
//     }
//   };

//   const renderInput = (index: number): React.ReactElement => {
//     return (
//       <TextInput
//         key={index}
//         ref={(ref) => (inputs.current[index] = ref)}
//         style={styles.input}
//         value={code[index]}
//         onChangeText={(text) => handleCodeChange(text, index)}
//         keyboardType="number-pad"
//         maxLength={1}
//         onKeyPress={(e) => handleKeyPress(index, e)}
//         autoComplete="off"
//         selectTextOnFocus
//         testID={`otp-input-${index}`}
//         accessible={true}
//         accessibilityLabel={`Enter digit ${index + 1} of verification code`}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Verification Code</Text>
//         <Text style={styles.subtitle}>
//           Please enter 4-digit code sent on {phoneNumber}
//         </Text>
//       </View>

//       <View style={styles.inputContainer}>
//         {[0, 1, 2, 3].map((index) => renderInput(index))}
//       </View>

//       {error ? <Text style={styles.errorText}>{error}</Text> : null}

//       <TouchableOpacity
//         style={[
//           styles.verifyButton,
//           !code.every((digit) => digit !== "") && styles.verifyButtonDisabled,
//         ]}
//         onPress={handlePress}
//         disabled={!code.every((digit) => digit !== "")}
//         testID="verify-button"
//       >
//         <Text style={styles.buttonText}>Verify</Text>
//       </TouchableOpacity>

//       <Text style={styles.timer}>{formatTime(timer)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     paddingTop: 70,
//   },
//   header: {
//     marginTop: 0,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 30,
//   },
//   input: {
//     width: 60,
//     height: 60,
//     borderWidth: 1,
//     borderRadius: 8,
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "500",
//     borderColor: "#ddd",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   verifyButton: {
//     backgroundColor: "#000",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   verifyButtonDisabled: {
//     backgroundColor: "#cccccc",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   timer: {
//     textAlign: "center",
//     marginTop: 16,
//     fontSize: 16,
//     color: "#666",
//   },
// });

// export default VerificationScreen;


// // import "react-native-url-polyfill/auto";
// // import { useState, useEffect } from "react";
// // import { supabase } from "../lib/supabase";
// // import Auth from "../components/Auth";
// // import { View, Text } from "react-native";
// // import { Session } from "@supabase/supabase-js";

// // export default function App() {
// //   const [session, setSession] = useState<Session | null>(null);

// //   useEffect(() => {
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       setSession(session);
// //     });

// //     supabase.auth.onAuthStateChange((_event, session) => {
// //       setSession(session);
// //     });
// //   }, []);

// //   return (
// //     <View>
// //       <Auth />
// //       {session && session.user && <Text>{session.user.id}</Text>}
// //     </View>
// //   );
// // }
