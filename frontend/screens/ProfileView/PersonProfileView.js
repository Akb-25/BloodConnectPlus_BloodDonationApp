import React, { useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Header from "../../components/Header";
import axios from "axios";
import { v4 as uuidv4} from "uuid";
import { UserContext } from "../../context/UserContext.js";

export default function PersonProfileView({ route, navigation }) {
    // const { name, phone, selectedCountry, selectedCity, dateOfBirth, gender, aboutYourself, isDonor, occupation, photo } = route.params;
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://192.168.1.6:5000/user/getUser");
                console.log(response.data);
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
    })
    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.1.6:5000/user/deleteUser/${userId}`);
            Alert.alert("Profile Deleted", "Your profile has been deleted successfully.");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error deleting profile:", error);
            Alert.alert("Error", "There was an issue deleting your profile.");
        }
    }

    const handleUpdate = () => {
        navigation.navigate("UpdateProfileStep1")
    }
    // if (loading) {
    //     return (
    //       <View style={styles.center}>
    //         <Text>Loading...</Text>
    //       </View>
    //     );
    //   }
    // if (userInfo){
    //     const { name,
    //         phone,
    //         selectedCountry,
    //         selectedCity,
    //         dateOfBirth,
    //         gender,
    //         aboutYourself,
    //         isDonor,
    //         occupation,
    //         photo
    //     } = userInfo;
    // }
    const {
        name,
        phone,
        selectedCountry,
        selectedCity,
        dateOfBirth,
        gender,
        aboutYourself,
        isDonor,
        occupation,
        photo
      } = {
        name: "akshay",
        phone: "1234567890",
        selectedCountry: "India",
        selectedCity: "Mumbai",
        dateOfBirth: "2000-01-01",
        gender: "Male",
        aboutYourself: "I am a Donor",
        isDonor: "Yes",
        occupation: "Software Engineer",
        photo: require("../../material/home.png")
      };   
           
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Confirm Your Profile</Text>
                {photo ? (
                    <Image source={{ photo }} style={styles.profileImage} />
                    // <Image source={{ uri: userInfo.photo.uri }} style={styles.profileImage} />
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
    
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete Profile</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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