import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
export default function ProfileStep1({ navigation }) {
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
        { label: "Other", value: "Other"},
    ];
    

    return (
        <ScrollView style={styles.input}>
            <Text>Date of Birth</Text>
            <TextInput
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD/MM/YYYY"
                style={{ borderBottomWidth: 1, width: 200, marginVertical: 20 }}
            />
            <Text>Gender</Text>
            <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
                style={{ width: 200 }}
            >
                {genders.map((gender) => (
                    <Picker.Item key={gender.value} label={gender.label} value={gender.value} />
                ))}
            </Picker>

            <Text>Occupation</Text>
            <TextInput
                value={occupation}
                onChangeText={(occupation) => setOccupation(occupation)}
                placeholder="Your occupation"
                style={{ borderBottomWidth: 1, width: 200, marginVertical: 20 }}
            />
            <Picker
                selectedValue={occupation}
                onValueChange={(value) => setOccupation(value)}
                style={{ width: 200 }}
            >
                {occupations.map((occupation) => (
                    <Picker.Item key={occupation.value} label={occupation.label} value={occupation.value} />
                ))}
                
            </Picker>

            <Text>I want to donate blood</Text>
            <Picker
                selectedValue={isDonor}
                onValueChange={(value) => setIsDonor(value)}
                style={{ width: 200 }}
            >
                <Picker.Item key="yes" label="Yes" value={true} />
                <Picker.Item key="no" label="No" value={false} />
            </Picker>

            <Text>About Yourself</Text>
            <TextInput
                value={aboutYourself}
                onChangeText={setAboutYourself}
                placeholder="Tell us about yourself"
                style={{ height: 200, width: 200, borderBottomWidth: 1, marginVertical: 20 }}
                multiline={true}
            />

            <TouchableOpacity onPress={() => navigation.navigate("ProfileStep3", { dateOfBirth, gender, aboutYourself, isDonor })}>
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

