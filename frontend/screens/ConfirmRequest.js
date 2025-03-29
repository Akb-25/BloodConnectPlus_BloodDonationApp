import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";
export default function ConfirmRequest({ navigation, route }) {
    const {
        recipientName,
        recipientPhone,
        recipientSelectedCity,
        recipientSelectedCountry,
        date,
        time,
        bloodGroup,
        gender,
        hospitalName,
        address,
        amountOfBlood,
        reason,
        contactPersonName,
        contactPersonPhone,
    } = route.params;

    function handleSubmit() {
        console.log("Submitting request details:", route.params);
        navigation.navigate("Home");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Confirm your Request"/>
            <Text style={styles.title}>Confirm Your Request</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.info}>
                    <Text style={styles.label}>Recipient Name:</Text> {recipientName}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Recipient Phone:</Text> {recipientPhone}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>City:</Text> {recipientSelectedCity}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Country:</Text> {recipientSelectedCountry}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Date: {date? date.toString() : "N/A"}</Text> 
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Time: {time ? time.toString() : "N/A"}</Text> 
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Blood Group:</Text> {bloodGroup}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Gender:</Text> {gender}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Hospital Name:</Text> {hospitalName}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Address:</Text> {address}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Amount of Blood:</Text> {amountOfBlood}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Reason:</Text> {reason}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Contact Person Name:</Text> {contactPersonName}
                </Text>
                <Text style={styles.info}>
                    <Text style={styles.label}>Contact Person Phone:</Text> {contactPersonPhone}
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️ Edit Details</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
    },
    title: {
        top: 15,
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
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
        backgroundColor: "#4CAF50",
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