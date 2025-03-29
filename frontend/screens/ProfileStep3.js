import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Header from "../components/Header";

export default function ProfileStep3({ navigation }) {
    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        const options = {
            mediaType: "photo",
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorMessage) {
                console.log("ImagePicker Error: ", response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setPhoto({ uri: response.assets[0].uri });
            }
        });
    };

    return (
        <View style={styles.container}>
            <Header title = "Profile Setup" />
            <Text style={styles.title}>Step 3: Profile Photo</Text>
            {photo ? (
                <Image source={photo} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No Photo Selected</Text>
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.nextButton]}
                onPress={() => navigation.navigate("ProfileView", { photo })}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#007bff",
    },
    placeholder: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    placeholderText: {
        color: "#757575",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
        marginBottom: 10,
    },
    nextButton: {
        backgroundColor: "#28a745",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});