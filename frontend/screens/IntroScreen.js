import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Logo from "../components/Logo.js";

export default function IntroScreen({ navigation }){
    return (
        
        <View style={styles.container}>
            <Logo/>
            <Button title="Register" onPress={ () => navigation.navigate("Register") }></Button>
            <Button title="Login" onPress = { () => navigation.navigate("Login")}></Button>
            <Button title="Home" onPress = { () => navigation.navigate("Home")}></Button>
            
            <Button title="Profile Creation" onPress = { () => navigation.navigate("ProfileNavigator")}></Button>
            <Button title="Request Creation" onPress = { () => navigation.navigate("RequestNavigator")}></Button>
            <Button title="Eligibility Screen" onPress = { () => navigation.navigate("EligibilityNavigator")}></Button>
        </View>
    )
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