import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import QuestionCard from "../components/QuestionCard";

const questions = [
    { id: 1, text: "Are you above 18 years old?", requiredYes: true },
    { id: 2, text: "Do you weigh more than 50kg?", requiredYes: true },
    { id: 3, text: "Have you donated blood in the last 3 months?", requiredYes: false },
    { id: 4, text: "Are you currently taking any medications?", requiredYes: false },
];

const EligibilityScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [eligible, setEligible] = useState(true);
    const handeNext = (answer) => {
        if (!answer && questions[index].requiredYes) {
            setEligible(false);
            navigation.replace("ResultScreen", { eligible: false });
            return;
        }

        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            navigation.navigate( "EligibilityResult", { eligible: answer});
        }
    };

    return (
        <View style = {styles.container}>
            <QuestionCard
                question = {questions[index].text}
                onYes = { () => handeNext(true) }
                onNo = { () => handeNext(false) }
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
});

export default EligibilityScreen;