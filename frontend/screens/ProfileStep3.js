import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Header from "../components/Header";
import { db, storage } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export default function ProfileStep3({ route, navigation }) {
    const { name, phone, selectedCity, selectedCountry, dateOfBirth, gender, aboutYourself, isDonor, occupation } = route.params;
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async () => {
        try{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("city", selectedCity);
            formData.append("country", selectedCountry);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("gender", gender);
            formData.append("occupation", occupation);
            formData.append("isDonor", isDonor);
            formData.append("about", aboutYourself);

            if (photo?.uri) {
                const fileName = photo.uri.split("/").pop();
                const fileType = photo.uri.split(".").pop();
                formData.append("photo", {
                    uri: photo.uri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }

            const response = await axios.post("http://<your-ip>:5000/views/upload-profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload success:", response.data);
            navigation.navigate("ProfileView", { photo });
        } catch (error) {
            console.error("Upload error:", error);
        }
    };
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
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Submit</Text>
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