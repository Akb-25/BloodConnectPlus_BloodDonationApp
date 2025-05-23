import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Header from "../../components/Header";
import axios from "axios";
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants";
import { UserContext } from "../../context/UserContext.js";
import { AuthenticatedUserContext } from '../../context/AuthenticatedUserContext';
import { supabase } from "../../config/supabase";

export default function ProfileSetup({ route, navigation }) {
    const { name, phone, selectedCountry, selectedCity, dateOfBirth, gender, aboutYourself, isDonor, occupation, photo } = route.params;
    const { saveUserId } = useContext(UserContext);
    const { setUser, setFirstLogin } = useContext(AuthenticatedUserContext);

    const handleSubmit = async () => {
        console.log("Submitting profile with given data");
        const userId = uuid.v4();
        console.log(userId);
        saveUserId(userId);
        
        console.log("The user id here is:", userId);
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("selectedCountry", selectedCountry);
            formData.append("selectedCity", selectedCity);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("gender", gender);
            formData.append("occupation", occupation);
            formData.append("aboutYourself", aboutYourself);
            formData.append("isDonor", isDonor);
    
            if (photo?.uri) {
                const fileName = photo.uri.split("/").pop();
                const fileType = fileName.split(".").pop();
                formData.append("photo", {
                    uri: photo.uri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }
    
            console.log("Form data:");
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            
            let response = await axios.post(BASE_URL+"/user/upload", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);
    
            if (response.status === 200) {
                // await AsyncStorage.setItem("customUserId", userId);
                navigation.navigate("Home");
                // navigation.navigate("Home", {
                // screen: "HomeScreen"  // or "Profile", "Requests", etc.
                // });
                // try {
                //     const { error } = await supabase.auth.signOut();
                //     if (error) {
                //         console.error("Supabase Sign Out Error:", error.message);
                //         Alert.alert("Sign Out Failed", error.message);
                //         return;
                //     }
                //     } catch (err) {
                //     console.error("Unexpected Sign Out Error:", err);
                //     Alert.alert("Unexpected Error", err.message);
                //     return;
                //     }

                //     setUser(null);
                //     setFirstLogin(false);

                //     navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'Login' }],
                //     });

                // navigation.replace("Home");
                // Alert.alert("Profile Submitted", "Your profile has been successfully submitted.");
                // navigation.navigate("Home");
            // } else {
                // throw new Error("Failed to submit profile");
            }
        } catch (error) {
            console.error("Error submitting profile:", error.message);
            Alert.alert("Error", "Failed to submit profile: ", error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Profile</Text>
            {photo ? (
                <Image source={{ uri: photo.uri }} style={styles.profileImage} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No Photo</Text>
                </View>
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.info}><Text style={styles.label}>Name:</Text> {name}</Text>
                <Text style={styles.info}><Text style={styles.label}>Phone:</Text> {phone}</Text>
                <Text style={styles.info}><Text style={styles.label}>City:</Text> {selectedCity}</Text>
                <Text style={styles.info}><Text style={styles.label}>Country:</Text> {selectedCountry}</Text>
                <Text style={styles.info}><Text style={styles.label}>Date of Birth:</Text> {dateOfBirth}</Text>
                <Text style={styles.info}><Text style={styles.label}>Gender:</Text> {gender}</Text>
                <Text style={styles.info}><Text style={styles.label}>About Yourself:</Text> {aboutYourself}</Text>
                <Text style={styles.info}><Text style={styles.label}>Donor Status:</Text> {isDonor ? "Yes" : "No"}</Text>
                <Text style={styles.info}><Text style={styles.label}>Occupation:</Text> {occupation}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️ Edit Details</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: "#007bff",
        marginBottom: 20,
    },
    placeholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    placeholderText: {
        color: "#757575",
        fontSize: 16,
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
        backgroundColor: "#28a745",
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