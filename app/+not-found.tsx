import { Link, Stack } from "expo-router";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Under Work",
                    headerStyle: {
                        backgroundColor: "#ffffff",
                    },
                    headerTintColor: "#333333",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />

            <View style={styles.content}>
                <MaterialIcons name="construction" size={80} color="#FFB946" />

                <Text style={styles.title}>Under Construction</Text>

                <Text style={styles.description}>
                    We're working hard to bring you something amazing. Please check back
                    later!
                </Text>

                <Link href="/" asChild>
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons
                            name="home"
                            size={24}
                            color="#FFFFFF"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>Return to Home</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <Text style={styles.footer}>We apologize for any inconvenience</Text>
        </View>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333333",
        marginTop: 20,
        marginBottom: 12,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
        marginBottom: 32,
        maxWidth: width * 0.8,
        lineHeight: 24,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    footer: {
        fontSize: 14,
        color: "#999999",
        textAlign: "center",
        paddingBottom: 20,
    },
});
