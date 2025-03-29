import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const QuestionCard = ({ question, onYes, onNo}) => {
    return ( 
        <View style = {styles.card}>
            <Text style = {styles.questionText}>{question}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={onYes}>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.noButton]} onPress={onNo}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: "center",
        margin: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    yesButton: {
        backgroundColor: "green",
    },
    noButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default QuestionCard;