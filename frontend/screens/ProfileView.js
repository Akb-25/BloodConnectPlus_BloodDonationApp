import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";

export default function ProfileSetup({ route, navigation }) {
    const { name, phone, selectedCountry, selectedCity, dateOfBirth, gender, aboutYourself, isDonor, occupation, photo } = route.params;

    function handleSubmit() {
        console.log("Submitting profile details:", route.params);
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Profile</Text>
            {photo ? (
                <Image source={{ uri: photo.uri }} style={styles.profileImage} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No Photo</Text>
                </View>
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.info}><Text style={styles.label}>Name:</Text> {name}</Text>
                <Text style={styles.info}><Text style={styles.label}>Phone:</Text> {phone}</Text>
                <Text style={styles.info}><Text style={styles.label}>City:</Text> {selectedCity}</Text>
                <Text style={styles.info}><Text style={styles.label}>Country:</Text> {selectedCountry}</Text>
                <Text style={styles.info}><Text style={styles.label}>Date of Birth:</Text> {dateOfBirth}</Text>
                <Text style={styles.info}><Text style={styles.label}>Gender:</Text> {gender}</Text>
                <Text style={styles.info}><Text style={styles.label}>About Yourself:</Text> {aboutYourself}</Text>
                <Text style={styles.info}><Text style={styles.label}>Donor Status:</Text> {isDonor ? "Yes" : "No"}</Text>
                <Text style={styles.info}><Text style={styles.label}>Occupation:</Text> {occupation}</Text>
            </View>

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
        backgroundColor: "#f8f9fa",
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: "#007bff",
        marginBottom: 20,
    },
    placeholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    placeholderText: {
        color: "#757575",
        fontSize: 16,
    },
    infoContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        color: "#555",
    },
    button: {
        backgroundColor: "#28a745",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backText: {
        fontSize: 16,
        color: "#007bff",
        marginTop: 10,
    },
});