import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EligibilityResult({ navigation, route }) {
    const { eligible } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>
                {eligible ? "You are eligible to donate blood!" : "Sorry, you are not eligible."}
            </Text>
            <Button title="Go Back" onPress={() => navigation.navigate("Home")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    resultText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
});
