import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EligibilityResult({ navigation, route }) {
    const { eligible } = route.params;

    return (
        <View style={styles.container}>
            <Text style={[styles.resultText, eligible ? styles.eligibleText : styles.notEligibleText]}>
                {eligible ? "🎉 You are eligible to donate blood!" : "❌ Sorry, you are not eligible."}
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Go Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    resultText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    eligibleText: {
        color: "#28a745", // Green for eligible
    },
    notEligibleText: {
        color: "#dc3545", // Red for not eligible
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});