import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const [recipientName, setRecipientName] = useState("");
const [recipientPhone, setRecipientPhone] = useState("");
const [recipientSelectedCity, setRecipientSelectedCity] = useState("");
const [recipientSelectedCountry, setRecipientSelectedCountry] = useState("");
const [date, setDate] = useState(new Date());
const [time, setTime] = useState(new Date());
const [bloodGroup, setBloodGroup] = useState("");
const [gender, setGender] = useState("");
const [hospitalName, setHospitalName] = useState("");
const [address, setAddress] = useState("");
const [amountOfBlood, setAmountOfBlood] = useState("");
const [reason, setReason] = useState("");
const [contactPersonName, setContactPersonName] = useState("");
const [contactPersonPhone, setContactPersonPhone] = useState("");

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

const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" }
];

const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" }
];

export default function RequestScreen() {
    return (
        <View style={styles.container}>
            <Header title="Request" />
            <Text style={styles.title}>Enter the details of the recipient</Text>

            <Text>Recipient's Name</Text>
            <TextInput
                value={recipientName}
                onChangeText={setRecipientName}
                style={styles.input}
            />

            <Text>Recipient's Phone Number</Text>
            <TextInput 
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                style={styles.input}
            />

            <Text>Recipient's Country</Text>
            <Picker
                selectedValue={recipientSelectedCountry}
                onValueChange={(value) => {
                    setRecipientSelectedCountry(value);
                    setRecipientSelectedCity(null);
                }}
                style={styles.picker}
            >
                {countries.map((country) => (
                    <Picker.Item key={country.value} label={country.label} value={country.value} />
                ))}
            </Picker>

            <Text>Recipient's City</Text>
            <Picker
                selectedValue={recipientSelectedCity}
                onValueChange={setRecipientSelectedCity}
                style={styles.picker}
                enabled={recipientSelectedCountry !== ""}
            >
                {recipientSelectedCountry && cities[recipientSelectedCountry].map((city) => (
                    <Picker.Item key={city.value} label={city.label} value={city.value} />
                ))}
            </Picker>

            <Text>Date</Text>
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(selectedDate) => setDate(selectedDate || date)}
                style={styles.picker}
            />

            <Text>Time</Text>
            <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(selectedTime) => setTime(selectedTime || time)}
                style={styles.picker}
            />

            <Text>Blood Group</Text>
            <Picker
                selectedValue={bloodGroup}
                onValueChange={setBloodGroup}
                style={styles.picker}
            >
                {bloodGroups.map((group) => (
                    <Picker.Item key={group.value} label={group.label} value={group.value} />
                ))}
            </Picker>

            <Text>Gender</Text>
            <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={styles.picker}
            >
                {genders.map((g) => (
                    <Picker.Item key={g.value} label={g.label} value={g.value} />
                ))}
            </Picker>

            <Text>Hospital Name</Text>
            <TextInput
                value={hospitalName}
                onChangeText={setHospitalName}
                style={styles.input}
            />

            <Text>Address</Text>
            <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
            />

            <Text>Amount of Blood Needed</Text>
            <TextInput
                value={amountOfBlood}
                onChangeText={setAmountOfBlood}
                style={styles.input}
            />

            <Text>Why do you need blood?</Text>
            <TextInput
                value={reason}
                onChangeText={setReason}
                style={styles.textarea}
                multiline
                numberOfLines={4}
            />

            <Text>Contact Person's Name (if different)</Text>
            <TextInput
                value={contactPersonName}
                onChangeText={setContactPersonName}
                style={styles.input}
            />

            <TouchableOpacity onPress={() => navigation.navigate("ConfirmRequest", { 
                recipientName, recipientPhone, recipientSelectedCity, recipientSelectedCountry, date, time, 
                bloodGroup, gender, hospitalName, address, amountOfBlood, reason, contactPersonName, contactPersonPhone
             })}>
                <Text style={{ fontSize: 20 }}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 18, color: "red" }}>Back</Text>
            </TouchableOpacity>            

            <Text>Contact Person's Phone Number (if different)</Text>
            <TextInput 
                value={contactPersonPhone}
                onChangeText={setContactPersonPhone}
                style={styles.input}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 16
    },
    textarea: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8
    }
});