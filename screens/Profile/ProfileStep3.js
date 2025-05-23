import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/Header";
import axios from "axios";

export default function ProfileStep3({ route, navigation }) {
    const { name, phone, selectedCity, selectedCountry, dateOfBirth, gender, aboutYourself, isDonor, occupation } = route.params;
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async () => {
        try{
            navigation.navigate("ProfileView", {
                name,
                phone,
                selectedCity,
                selectedCountry,
                dateOfBirth,
                gender,
                aboutYourself,
                isDonor,
                occupation,
                photo,
        });
    } catch (error) {
        console.error("Upload error:", error);
    }
};

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "We need access to your photos to continue.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPhoto({ uri: result.assets[0].uri });
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Profile Setup" />
            <Text style={styles.title}>Step 3: Profile Photo</Text>
            {photo ? (
                <Image source={photo} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No Photo Selected</Text>
                </View>
            )}

            <TouchableOpacity style={styles.chooseButton} onPress={handleChoosePhoto}>
                <Text style={[styles.buttonText, { color: "red" }]}>Choose Photo</Text>
            </TouchableOpacity>

            <View style={styles.footerButtons}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#b30000",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#cc0000",
    },
    placeholder: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#f4cccc",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    placeholderText: {
        color: "#990000",
        fontSize: 16,
    },
    chooseButton: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 2,
        alignItems: "center",
        marginBottom: 30,
        width: "80%",
        color: "red",
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#fff5f5",
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