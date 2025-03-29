import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QuestionCard from "../components/QuestionCard";

const questions = [
    { id: 1, text: "Are you above 18 years old?", requiredYes: true },
    { id: 2, text: "Do you weigh more than 50kg?", requiredYes: true },
    { id: 3, text: "Have you donated blood in the last 3 months?", requiredYes: false },
    { id: 4, text: "Are you currently taking any medications?", requiredYes: false },
    { id: 5, text: "Do you have any chronic illnesses?", requiredYes: false },
    { id: 6, text: "Have you had any recent surgeries?", requiredYes: false },
];

const EligibilityScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [eligible, setEligible] = useState(true);

    const handleNext = (answer) => {
        if (!answer && questions[index].requiredYes) {
            setEligible(false);
            navigation.replace("EligibilityResult", { eligible: false });
            return;
        }

        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            navigation.navigate("EligibilityResult", { eligible: true });
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