import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RequestScreen({ navigation }) {
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
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [showTimepicker, setShowTimepicker] = useState(false);

    const countries = [
        { label: "India", value: "India" },
        { label: "United States", value: "United States" },
        { label: "United Kingdom", value: "United Kingdom" },
    ];

    const cities = {
        India: [
            { label: "Mumbai", value: "Mumbai" },
            { label: "Bangalore", value: "Bangalore" },
        ],
        "United States": [
            { label: "New York", value: "New York" },
            { label: "Los Angeles", value: "Los Angeles" },
        ],
        "United Kingdom": [
            { label: "London", value: "London" },
            { label: "Manchester", value: "Manchester" },
        ],
    };

    const bloodGroups = [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
    ];

    const genders = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Request Blood" />
            <Text style={styles.title}>Enter the details of the recipient</Text>

            <Text style={styles.label}>Recipient's Name</Text>
            <TextInput
                value={recipientName}
                onChangeText={setRecipientName}
                style={styles.input}
                placeholder="Enter recipient's name"
            />

            <Text style={styles.label}>Recipient's Phone Number</Text>
            <TextInput
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                style={styles.input}
                placeholder="Enter recipient's phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Recipient's Country</Text>
            <Picker
                selectedValue={recipientSelectedCountry}
                onValueChange={(value) => {
                    setRecipientSelectedCountry(value);
                    setRecipientSelectedCity(""); 
                }}
                style={styles.picker}
            >
                <Picker.Item label="Select Country" value="" />
                {countries.map((country) => (
                    <Picker.Item key={country.value} label={country.label} value={country.value} />
                ))}
            </Picker>

            {recipientSelectedCountry !== "" && (
                <>
                    <Text style={styles.label}>Recipient's City</Text>
                    <Picker
                        selectedValue={recipientSelectedCity}
                        onValueChange={setRecipientSelectedCity}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select City" value="" />
                        {cities[recipientSelectedCountry].map((city) => (
                            <Picker.Item key={city.value} label={city.label} value={city.value} />
                        ))}
                    </Picker>
                </>
            )}

                    
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatepicker(true)}>
            <Text style={styles.input}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatepicker && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                setDate(selectedDate || date);
                setShowDatepicker(false);
                }}
                style={styles.picker}
            />
            )}

            <Text style={styles.label}>Time</Text>
            <TouchableOpacity onPress={() => setShowTimepicker(true)}>
            <Text style={styles.input}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showTimepicker && (
            <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(_, selectedTime) => {
                setTime(selectedTime || time);
                setShowTimepicker(false);
                }}
                style={styles.picker}
            />
            )}

            <Text style={styles.label}>Blood Group</Text>
            <Picker
                selectedValue={bloodGroup}
                onValueChange={setBloodGroup}
                style={styles.picker}
            >
                {bloodGroups.map((group) => (
                    <Picker.Item key={group.value} label={group.label} value={group.value} />
                ))}
            </Picker>

            <Text style={styles.label}>Gender</Text>
            <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={styles.picker}
            >
                {genders.map((g) => (
                    <Picker.Item key={g.value} label={g.label} value={g.value} />
                ))}
            </Picker>

            <Text style={styles.label}>Hospital Name</Text>
            <TextInput
                value={hospitalName}
                onChangeText={setHospitalName}
                style={styles.input}
                placeholder="Enter hospital name"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                placeholder="Enter address"
            />

            <Text style={styles.label}>Amount of Blood Needed</Text>
            <TextInput
                value={amountOfBlood}
                onChangeText={setAmountOfBlood}
                style={styles.input}
                placeholder="Enter amount of blood needed"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Reason for Blood Request</Text>
            <TextInput
                value={reason}
                onChangeText={setReason}
                style={styles.textarea}
                placeholder="Enter reason for blood request"
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Contact Person's Name (if different)</Text>
            <TextInput
                value={contactPersonName}
                onChangeText={setContactPersonName}
                style={styles.input}
                placeholder="Enter contact person's name"
            />

            <Text style={styles.label}>Contact Person's Phone Number (if different)</Text>
            <TextInput
                value={contactPersonPhone}
                onChangeText={setContactPersonPhone}
                style={styles.input}
                placeholder="Enter contact person's phone number"
                keyboardType="phone-pad"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("ConfirmRequest", {
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
                    })
                }
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    title: {
        marginTop: 100,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 24,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        height: 45,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        textAlignVertical: "center",
    },
    picker: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    textarea: {
        height: 100,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        textAlignVertical: "top",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#ff4d4d",
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backText: {
        fontSize: 16,
        color: "#333",
        marginTop: 20,
        textAlign: "center",
        fontWeight: "600",
    },
});
