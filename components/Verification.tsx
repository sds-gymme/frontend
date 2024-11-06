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
import { StackNavigationProp } from "@react-navigation/stack";

interface VerificationScreenProps {
  navigation: StackNavigationProp<any>;
  phoneNumber?: string;
}

interface InputRefType extends TextInput {
  focus(): void;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  navigation,
  phoneNumber = "+91 98765****1",
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const inputs = useRef<Array<InputRefType | null>>([]);

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

  const handleVerify = async (): Promise<boolean> => {
    try {
      const verificationCode = code.join("");
      console.log("Verifying code:", verificationCode);
      if (verificationCode === "1234") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  };

  const handlePress = async () => {
    const isVerified = await handleVerify();
    if (isVerified) {
      navigation.navigate("Registration");
    } else {
      setError("Invalid verification code. Please try again.");
    }
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
          Please enter 4-digit code sent on {phoneNumber}
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
