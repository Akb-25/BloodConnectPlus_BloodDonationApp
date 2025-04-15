import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import QuestionCard from "../components/QuestionCard";
import * as Location from "expo-location";

// const [longitude, setLongitude] = useState("");
// const [latitude, setLatitude] = useState("");

// const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Location permission not granted");
//       return;
//     }
//     const location = await Location.getCurrentPositionAsync({});
//     const latitude = location.coords.latitude;
//     setLatitude(latitude);
//     const longitude = location.coords.longitude;
//     setLongitude(longitude);
//     return true;
//   };

const questions = [
    { id: 1, text: "Are you above 18 years old?", requiredAnswer: true },
    { id: 2, text: "Do you weigh more than 50kg?", requiredAnswer: true },
    { id: 3, text: "Have you donated blood in the last 3 months?", requiredAnswer: false },
    { id: 4, text: "Are you currently taking any medications?", requiredAnswer: false },
    { id: 5, text: "Do you have any chronic illnesses?", requiredAnswer: false },
    { id: 6, text: "Have you had any recent surgeries?", requiredAnswer: false },
];

const EligibilityScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [eligible, setEligible] = useState(true);

    const handleNext = async (answer) => {
        if (answer != questions[index].requiredAnswer) {
          setEligible(false);
          navigation.replace("EligibilityResult", { eligible: false });
          return;
        }
      
        if (index < questions.length - 1) {
          setIndex(index + 1);
        } else {
          Alert.alert(
            "Location Required",
            "We need your location to match you with nearby donors. Proceed?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            const { status } = await Location.requestForegroundPermissionsAsync();
                            if (status !== "granted") {
                                Alert.alert("Permission Denied", "Location access is required.");
                                return;
                            }
                            const loc = await Location.getCurrentPositionAsync({});
                            const { latitude, longitude } = loc.coords;

                            navigation.replace("EligibilityResult", {
                                eligible: true,
                                latitude,
                                longitude,
                            });
                        } catch (err) {
                            Alert.alert("Error", "Unable to fetch location. Try again.");
                        }
                    }
                }
            ]
        );

        // Prevent continuing execution before user confirms
        return;
    }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eligibility Check</Text>
            <QuestionCard
                question={questions[index].text}
                onYes={() => handleNext(true)}
                onNo={() => handleNext(false)}
            />
            <Text style={styles.progress}>
                Question {index + 1} of {questions.length}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    progress: {
        marginTop: 20,
        fontSize: 16,
        color: "#555",
    },
});

export default EligibilityScreen;