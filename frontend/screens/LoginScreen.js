import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert, Button } from "react-native";
import Header from "../components/Header";
// import BottomTabNavigator from "../navigation/BottomTabNavigator";

export default function LoginScreen({ navigation }) {
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

    function handleForgetPassword() {
        navigation.navigate("ForgetPassword");
    }

    return (
        <View style={styles.container}>
            <Header title="Login" />
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
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
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
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    forgetPasswordText: {
        color: "#007BFF",
        marginTop: 10,
    },
});
