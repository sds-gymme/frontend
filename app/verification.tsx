import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

interface InputRefType extends TextInput {
  focus(): void;
}

const VerificationScreen = () => {
  const { phoneNumber } = useLocalSearchParams();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const inputs = useRef<(InputRefType | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text: string, index: number): void => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number): void => {
    if (index > 0 && code[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVerify = () => {
    const verificationCode = code.join("");

    // Check if the code is "1234"
    if (verificationCode === "1234") {
      router.replace("/registration");
      return true;
    } else {
      setError("Invalid verification code.");
      return false;
    }
  };

  const handlePress = () => {
    handleVerify();
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ): void => {
    if (e.nativeEvent.key === "Backspace") {
      handleBackspace(index);
    }
  };

  const renderInput = (index: number): React.ReactElement => {
    return (
      <TextInput
        key={index}
        ref={(ref) => (inputs.current[index] = ref)}
        style={styles.input}
        value={code[index]}
        onChangeText={(text) => handleCodeChange(text, index)}
        keyboardType="number-pad"
        maxLength={1}
        onKeyPress={(e) => handleKeyPress(index, e)}
        autoComplete="off"
        selectTextOnFocus
        testID={`otp-input-${index}`}
        accessible={true}
        accessibilityLabel={`Enter digit ${index + 1} of verification code`}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Please enter valid 4-digit code sent on your mobile.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {[0, 1, 2, 3].map((index) => renderInput(index))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[
          styles.verifyButton,
          !code.every((digit) => digit !== "") && styles.verifyButtonDisabled,
        ]}
        onPress={handlePress}
        disabled={!code.every((digit) => digit !== "")}
        testID="verify-button"
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.timer}>{formatTime(timer)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 70,
  },
  header: {
    marginTop: 0,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    borderColor: "#ddd",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  timer: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});

export default VerificationScreen;


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
// import { router, useLocalSearchParams } from "expo-router";
// import { supabase } from "../lib/supabase";
// import { Session } from "@supabase/supabase-js";
//
// interface VerificationScreenProps {
//   phoneNumber?: string;
// }
//
// interface InputRefType extends TextInput {
//   focus(): void;
// }
//
// const VerificationScreen: React.FC<VerificationScreenProps> = () => {
//   const { phoneNumber } = useLocalSearchParams();
//   const formattedPhoneNumber = (phoneNumber as string) || "";
//   const [code, setCode] = useState<string[]>(["", "", "", ""]);
//   const [timer, setTimer] = useState<number>(60);
//   const [error, setError] = useState<string>("");
//   const inputs = useRef<(InputRefType | null)[]>([]);
//
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
//
//     return () => clearInterval(interval);
//   }, []);
//
//   const handleCodeChange = (text: string, index: number): void => {
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);
//
//     if (text.length === 1 && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };
//
//   const handleBackspace = (index: number): void => {
//     if (index > 0 && code[index] === "") {
//       inputs.current[index - 1]?.focus();
//     }
//   };
//
//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };
//
//   async function handleVerify() {
//     const verificationCode = code.join("");
//
//     if (verificationCode.length !== 4) {
//       setError("Please enter the complete 4-digit code");
//       return false;
//     }
//
//     try {
//       const { data, error } = await supabase.auth.verifyOtp({
//         phone: formattedPhoneNumber,
//         token: verificationCode,
//         type: "sms",
//       });
//
//       if (error) {
//         console.error("Error verifying OTP:", error.message);
//         setError(error.message || "Verification failed. Please try again.");
//         return false;
//       }
//
//       if (data.session) {
//         console.log("Verification successful:", data.session);
//         router.replace("/registration");
//         return true;
//       }
//
//       return false;
//     } catch (err) {
//       console.error("Unexpected error during verification:", err);
//       setError("An unexpected error occurred. Please try again.");
//       return false;
//     }
//   }
//
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
//
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
//
//       <View style={styles.inputContainer}>
//         {[0, 1, 2, 3].map((index) => renderInput(index))}
//       </View>
//
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//
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
//
//       <Text style={styles.timer}>{formatTime(timer)}</Text>
//     </View>
//   );
// };
//
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
//
// export default VerificationScreen;
//
//
// // import "react-native-url-polyfill/auto";
// // import { useState, useEffect } from "react";
// // import { supabase } from "../lib/supabase";
// // import Auth from "../components/Auth";
// // import { View, Text } from "react-native";
// // import { Session } from "@supabase/supabase-js";
//
// // export default function App() {
// //   const [session, setSession] = useState<Session | null>(null);
//
// //   useEffect(() => {
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       setSession(session);
// //     });
//
// //     supabase.auth.onAuthStateChange((_event, session) => {
// //       setSession(session);
// //     });
// //   }, []);
//
// //   return (
// //     <View>
// //       <Auth />
// //       {session && session.user && <Text>{session.user.id}</Text>}
// //     </View>
// //   );
// // }
