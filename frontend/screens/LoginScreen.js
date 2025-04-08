import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase.js";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const login = async (email, password) => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log("User logged in successfully:", userCredential.user);
            Alert.alert("Success", "Logged in successfully!");

            navigation.navigate("Home");  
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

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
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={() => login(email, password)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>Don't have an account? Register</Text>
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
    registerText: {
        color: "#007BFF",
        marginTop: 10,
        fontSize: 16,
    },
});
