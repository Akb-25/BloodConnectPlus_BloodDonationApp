import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert, Button } from "react-native";
import Header from "../components/Header";
export default function LoginScreen({ navigation }){
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

    function handleForgetPassword(){
        navigation.navigate("ForgetPassword");
    }
    
    return(
        <View style={StyleSheet.container}>
            <Header title="Login" />

            <Text style={styles.heading}>Welcome Back!</Text>

            <Text>Email</Text>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            // placeholder="Enter your email here"
            />

            <Text>Password</Text>
            <TextInput
            style={styles.input}
            value = {password}
            onChangeText = {setPassWord}
            secureTextEntry
            // placeholder = "Enter your password here"
            />
            <TouchableOpacity style={styles.forgetPassword} onPress={ handleForgetPassword }>
                <Text>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style = { styles.button } onPress={() => navigation.navigate("Home")}>
                <Text style={styles.registerText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orLine}>----------------------OR----------------------</Text>

            <TouchableOpacity style = { styles.button2 } onPress={() => navigation.navigate("RegisterGoogle")}>
                <Text>Sign in with Google</Text>
            </TouchableOpacity>

            <Text style={styles.login} onPress={() => navigation.navigate("Register") }>Don't have an account? Sign Up</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginStart: 20
    },
    heading: {
        fontSize: 24,
        marginBottom: 20
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    forgetPassword: {
        alignSelf: "flex-end",
        marginBottom: 10
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 10
    },
    button2: {
        backgroundColor: "white",
        color: "black",
        padding: 10,
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    registerText: {
        color: "#fff"
    },
    loginText: {
        color: "blue"
    },
    login: {
        marginBottom: 20
    },
    orLine: {
        justifyContent: "center",
        alignItems: "center",
    }
});