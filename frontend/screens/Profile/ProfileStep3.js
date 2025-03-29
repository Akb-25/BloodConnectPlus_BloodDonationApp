import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"; // ✅ Correct import

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
                setPhoto({ uri: response.assets[0].uri }); // ✅ Corrected response structure
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 3: Profile Photo</Text>
            {photo && <Image source={photo} style={styles.image} />}
            
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileView", { photo })}>
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
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});