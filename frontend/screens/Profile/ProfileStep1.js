import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
        <ScrollView style={styles.input}>
            <Text>Enter Your Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={{ borderBottomWidth: 1, width: 200, marginVertical: 20 }}
            />
            <Text>Enter Your Phone Number</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, width: 200, marginVertical: 20 }}
            />
            <Text>Enter Your Country</Text>
            <RNPickerSelect
                onValueChange={(value) => {
                    setSelectedCountry(value);
                    setSelectedCity(null); // Reset city when country changes
                }}
                items={countries}
            />

            {
                selectedCountry && (
                    <>
                        <Text>Enter Your City</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedCity(value)}
                            items = {cities[selectedCountry] || []}
                        />
                    </>
                )
            }

            <TouchableOpacity onPress={() => navigation.navigate("ProfileStep2", { name, phone, selectedCity, selectedCountry })}>
                <Text style={{ fontSize: 20 }}>➡️ Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 18, color: "red" }}>⬅️ Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = {
    input: { 
        flex: 1, 
        // justifyContent: "center", 
        // alignItems: "center" 
    },
}
