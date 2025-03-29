import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Header from "../components/Header";

export default function ProfileStep1({ navigation }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    const countries = [
        { label: "India", value: "India" },
        { label: "United States", value: "United States" },
        { label: "United Kingdom", value: "United Kingdom" }
    ];

    const cities = {
        India: [
            { label: "Mumbai", value: "Mumbai" },
            { label: "Bangalore", value: "Bangalore" }
        ],
        "United States": [
            { label: "New York", value: "New York" },
            { label: "Los Angeles", value: "Los Angeles" }
        ],
        "United Kingdom": [
            { label: "London", value: "London" },
            { label: "Manchester", value: "Manchester" }
        ]
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Profile Setup"/>
            <Text style={styles.label}>Enter Your Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Your Name"
            />

            <Text style={styles.label}>Enter Your Phone Number</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Your Phone Number"
            />

            <Text style={styles.label}>Enter Your Country</Text>
            <RNPickerSelect
                onValueChange={(value) => {
                    setSelectedCountry(value);
                    setSelectedCity(null); // Reset city when country changes
                }}
                items={countries}
                style={pickerSelectStyles}
                placeholder={{ label: "Select a country", value: null }}
            />

            {selectedCountry && (
                <>
                    <Text style={styles.label}>Enter Your City</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedCity(value)}
                        items={cities[selectedCountry] || []}
                        style={pickerSelectStyles}
                        placeholder={{ label: "Select a city", value: null }}
                    />
                </>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("ProfileStep2", { name, phone, selectedCity, selectedCountry })
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        color: "#333",
    },
    inputAndroid: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        color: "#333",
    },
});
