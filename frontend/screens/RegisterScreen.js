import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");

    const handleRegister = () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        Alert.alert("Success", "Registered successfully!");
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <Header title="Register" />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassWord}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.orLine}>----------------------OR----------------------</Text>
            <TouchableOpacity style={styles.buttonGoogle} onPress={() => navigation.navigate("RegisterGoogle")}>
                <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
            <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}>
                Already have an account? Login
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    input: {
        width: "100%",
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#007BFF",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    orLine: {
        color: "#888",
        marginVertical: 10,
    },
    buttonGoogle: {
        width: "100%",
        padding: 15,
        backgroundColor: "#DB4437",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    googleText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginText: {
        color: "#007BFF",
        marginTop: 20,
        fontSize: 16,
    },
});