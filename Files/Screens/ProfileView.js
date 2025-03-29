import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"; // ✅ Correct import

export default function ProfileSetup({ route, navigation }) {
    const { name, phone, selectedCountry, selectedCity, dateOfBirth, gender, aboutYourself, isDonor, occupation } = route.params;
    function handleSubmit() {
        console.log("Submitting profile details:", route.params);
        navigation.navigate("Home");
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Profile</Text>
            {route.params.photo && <Image source={{uri: route.params.photo.uri}} style={{width: 100, height: 100, borderRadius: 50}}/>}
            <Text style={styles.info}>Name: {name}</Text>
            <Text style={styles.info}>Phone: {phone}</Text>
            <Text style={styles.info}>City: {selectedCity}</Text>
            <Text style={styles.info}>Country: {selectedCountry}</Text>
            <Text style={styles.info}>Date of Birth: {dateOfBirth}</Text>
            <Text style={styles.info}>Gender: {gender}</Text>
            <Text style={styles.info}>About Yourself: {aboutYourself}</Text>
            <Text style={styles.info}>Donor Status: {isDonor ? "Yes" : "No"}</Text>
            <Text style={styles.info}>Occupation: {occupation}</Text>

            
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️ Edit Details</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    backText: {
        fontSize: 18,
        color: "red",
        marginTop: 20,
    },
});