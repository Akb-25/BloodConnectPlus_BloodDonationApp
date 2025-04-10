import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
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
        navigation.navigate("RequestMap", { recipientSelectedCity, bloodGroup });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Confirm your Request" />
            <Text style={styles.title}>Confirm Your Request</Text>

            <View style={styles.card}>
                <Field label="Recipient Name" value={recipientName} />
                <Field label="Recipient Phone" value={recipientPhone} />
                <Field label="City" value={recipientSelectedCity} />
                <Field label="Country" value={recipientSelectedCountry} />
                <Field label="Date" value={date ? date.toString() : "N/A"} />
                <Field label="Time" value={time ? time.toString() : "N/A"} />
                <Field label="Blood Group" value={bloodGroup} />
                <Field label="Gender" value={gender} />
                <Field label="Hospital Name" value={hospitalName} />
                <Field label="Address" value={address} />
                <Field label="Amount of Blood" value={amountOfBlood} />
                <Field label="Reason" value={reason} />
                <Field label="Contact Person Name" value={contactPersonName} />
                <Field label="Contact Person Phone" value={contactPersonPhone} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>🚑 Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️ Edit Details</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function Field({ label, value }) {
    return (
        <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f1f3f5",
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        marginVertical: 20,
        textAlign: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    fieldRow: {
        marginBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 6,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        color: "#111",
    },
    button: {
        backgroundColor: "#ff5252",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
    backText: {
        fontSize: 15,
        color: "#007bff",
        marginTop: 16,
        textAlign: "center",
    },
});