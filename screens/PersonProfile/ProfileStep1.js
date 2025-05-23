import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Header from "../../components/Header";

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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <Header title="Profile Setup" />
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                
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

                <Text style={styles.label}>Select Your Country</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                                        selectedValue={selectedCountry}
                                        onValueChange={(value) => {
                                            setSelectedCountry(value);
                                            setSelectedCity("");
                                        }}
                                        style={pickerSelectStyles.inputAndroid}
                                    >
                                        <Picker.Item label="Select a country" value="" />
                                        {countries.map((country) => (
                                            <Picker.Item key={country.value} label={country.label} value={country.value} />
                                        ))}
                                    </Picker>
                </View>

                {selectedCountry && (
                    <>
                        <Text style={styles.label}>Select Your City</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                                        selectedValue={selectedCity}
                                                        onValueChange={(value) => setSelectedCity(value)}
                                                        style={pickerSelectStyles.inputAndroid}
                                                    >
                                                        <Picker.Item label="Select a city" value="" />
                                                        {(cities[selectedCountry] || []).map((city) => (
                                                            <Picker.Item key={city.value} label={city.label} value={city.value} />
                                                        ))}
                                                    </Picker>
                        </View>
                    </>
                )}
            </ScrollView>

            <View style={styles.footerButtons}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() =>
                        navigation.navigate("UpdateProfileStep2", { name, phone, selectedCity, selectedCountry })
                    }
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        padding: 20,
        backgroundColor: "#f8f9fa",
        paddingBottom: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
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
        marginBottom: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#f8f9fa",
        marginBottom: 45,
    },
    nextButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    nextButtonText: {
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