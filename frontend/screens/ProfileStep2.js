import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";

export default function ProfileStep2({ route, navigation }) {
    const { name, phone, selectedCity, selectedCountry } = route.params;

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [aboutYourself, setAboutYourself] = useState("");
    const [isDonor, setIsDonor] = useState(false);
    const [occupation, setOccupation] = useState("");

    const genders = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
    ];

    const occupations = [
        { label: "Student", value: "Student" },
        { label: "Professional", value: "Professional" },
        { label: "Home Maker", value: "Home Maker" },
        { label: "Retired", value: "Retired" },
        { label: "Unemployed", value: "Unemployed" },
        { label: "Other", value: "Other" },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Profile Setup"/>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD/MM/YYYY"
                style={styles.input}
            />

            <Text style={styles.label}>Gender</Text>
            <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
                style={styles.picker}
            >
                {genders.map((gender) => (
                    <Picker.Item key={gender.value} label={gender.label} value={gender.value} />
                ))}
            </Picker>

            <Text style={styles.label}>Occupation</Text>
            <Picker
                selectedValue={occupation}
                onValueChange={(value) => setOccupation(value)}
                style={styles.picker}
            >
                {occupations.map((occupation) => (
                    <Picker.Item key={occupation.value} label={occupation.label} value={occupation.value} />
                ))}
            </Picker>

            <Text style={styles.label}>I want to donate blood</Text>
            <Picker
                selectedValue={isDonor}
                onValueChange={(value) => setIsDonor(value)}
                style={styles.picker}
            >
                <Picker.Item key="yes" label="Yes" value={true} />
                <Picker.Item key="no" label="No" value={false} />
            </Picker>

            <Text style={styles.label}>About Yourself</Text>
            <TextInput
                value={aboutYourself}
                onChangeText={setAboutYourself}
                placeholder="Tell us about yourself"
                style={styles.textArea}
                multiline={true}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("ProfileStep3", { name, phone, selectedCity, selectedCountry, dateOfBirth, gender, aboutYourself, isDonor, occupation })
                }
            >
                <Text style={styles.buttonText}>➡️ Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>⬅️ Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    picker: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 10,
        alignItems: "center",
    },
    backButtonText: {
        color: "red",
        fontSize: 16,
    },
});