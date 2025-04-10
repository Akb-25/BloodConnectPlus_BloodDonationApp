import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase.js";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const navigation = useNavigation();

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
        
    
   
    const onHandleLogin = (e) => {
      e.preventDefault();
      console.log(email)
      console.log(password)
      if (email !== "" && password !== "") {
        console.log("Trying to log in now")
        signInWithEmailAndPassword(auth, email, password)
          .then(() => console.log("Login success"))
          .catch((err) => Alert.alert("Login error", err.message));
      }
    };

    return (
        <View style={styles.container}>
            <Header title="Login" />
            <View style={styles.form}>
                <Text style={styles.label}>Enter Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Enter Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Don't have an account? Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB", // light neutral background
    },
    form: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    label: {
        fontSize: 16,
        color: "#111827", // black text
        marginBottom: 6,
        marginTop: 14,
        fontWeight: "500",
    },
    input: {
        height: 42,
        borderBottomWidth: 1,
        borderColor: "#9CA3AF", // gray border
        marginBottom: 12,
        fontSize: 16,
        paddingHorizontal: 4,
        color: "#111827", // black input text
    },
    forgotText: {
        fontSize: 13,
        color: "#111827", // black text
        textAlign: "right",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#DC2626", // red button
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    registerText: {
        color: "#111827", // black text
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
    },
});