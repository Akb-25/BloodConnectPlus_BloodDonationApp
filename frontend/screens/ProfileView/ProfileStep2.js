import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";

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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <Header title="Profile Setup" />
            <ScrollView contentContainerStyle={styles.container}>
                

                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    placeholder="DD/MM/YYYY"
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value) => setGender(value)}
                        style={styles.picker}
                    >
                        {genders.map((gender) => (
                            <Picker.Item key={gender.value} label={gender.label} value={gender.value} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Occupation</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={occupation}
                        onValueChange={(value) => setOccupation(value)}
                        style={styles.picker}
                    >
                        {occupations.map((occupation) => (
                            <Picker.Item key={occupation.value} label={occupation.label} value={occupation.value} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>I want to donate blood</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={isDonor}
                        onValueChange={(value) => setIsDonor(value)}
                        style={styles.picker}
                    >
                        <Picker.Item key="yes" label="Yes" value={true} />
                        <Picker.Item key="no" label="No" value={false} />
                    </Picker>
                </View>

                <Text style={styles.label}>About Yourself</Text>
                <TextInput
                    value={aboutYourself}
                    onChangeText={setAboutYourself}
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#999"
                    style={styles.textArea}
                    multiline={true}
                />

                

                

                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("UpdateProfileStep3", {
                                name, phone, selectedCity, selectedCountry,
                                dateOfBirth, gender, aboutYourself, isDonor, occupation
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        marginTop: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 20,
        overflow: "hidden",
        backgroundColor: "#fff",
        ...Platform.select({
            android: {
                justifyContent: "center",
            }
        })
    },
    picker: {
        height: 50,
        width: "100%",
    },
    textArea: {
        height: 120,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 20,
        backgroundColor: "#fff",
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 15,
        alignItems: "center",
    },
    backButtonText: {
        color: "#dc3545",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#f8f9fa",
    },
    button: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    backButton: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#000",
    },
    backButtonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
});



const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: "#333",
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: "#333",
    },
});