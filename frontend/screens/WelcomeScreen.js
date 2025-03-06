import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to BloodConnect</Text>
            <Button title="Home Screen" onPress={ () => navigation.navigate("Home") }></Button>
            <Button title="Register" onPress={ () => navigation.navigate("Register") }></Button>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
});