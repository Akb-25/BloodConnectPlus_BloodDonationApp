import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ConfirmRequest from "../screens/ConfirmRequest";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function ConfirmRequestNavigator({ navigation, route }) {
    const { recipientName, recipientPhone, recipientSelectedCity, recipientSelectedCountry, date, time, bloodGroup, gender, hospitalName, address, amountOfBlood, reason, contactPersonName, contactPersonPhone} = route.params;
    
    function handleSubmit() {
        console.log("Submitting profile details:", route.params);
        navigation.navigate("Home");
    }

    return (
        <ScrollView>
            <Text>Recipient Name: {recipientName}</Text>
            <Text>Recipient Phone: {recipientPhone}</Text>
            <Text>Recipient City: {recipientSelectedCity}</Text>
            <Text>Recipient Country: {recipientSelectedCountry}</Text>
            <Text>Date: {date}</Text>
            <Text>Time: {time}</Text>
            <Text>Blood Group: {bloodGroup}</Text>
            <Text>Gender: {gender}</Text>
            <Text>Hospital Name: {hospitalName}</Text>
            <Text>Address: {address}</Text>
            <Text>Amount of Blood: {amountOfBlood}</Text>
            <Text>Reason: {reason}</Text>
            <Text>Contact Person Name: {contactPersonName}</Text>
            <Text>Contact Person Phone: {contactPersonPhone}</Text>
        
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️ Edit Details</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
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
    backText: {
        fontSize: 18,
        color: "red",
        marginTop: 20,
    },
});