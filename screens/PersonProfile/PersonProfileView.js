import React, { useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, useWindowDimensions } from "react-native";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header";
import axios from "axios";
import { v4 as uuidv4} from "uuid";
import { UserContext } from "../../context/UserContext.js";
import { BASE_URL } from "../../constants.js";
export default function PersonProfileView({ route, navigation }) {
    // const { name, phone, selectedCountry, selectedCity, dateOfBirth, gender, aboutYourself, isDonor, occupation, photo } = route.params;
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(UserContext);
    const [ count, setCount ] = useState(0);
    const [userInfo, setUserInfo] = useState({});
    const { height, width } = useWindowDimensions();
    const { clearUserId } = useContext(UserContext);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(BASE_URL+"/user/profile/"+userId);
                const response = await axios.get(BASE_URL+"/user/profile/"+userId);
                console.log(response.data);
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData(); 
    }, [userId]);

    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await axios.get(BASE_URL+"/donor/get-user-donations-count/"+userId);
                console.log("Count response:", response.data.count);
                setCount(response.data.count);
            } catch (error) {
                console.error("Error fetching count:", error);
            }
        };
        getCount();
    }, [userId]); 

    // useEffect(() => {
    //     if(!userId){
    //         navigation.replace("LoginScreen");
    //     }
    // }, [userId]);
    const handleDelete = async () => {
        try {
            await axios.delete(BASE_URL+`/user/deleteUser/${userId}`);
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

    const logout = async () => {
        try{
            clearUserId();
            navigation.navigate("LoginScreen");
        }
        catch(error){
            console.log(error);
        }
    }
    // if (loading) {
    //     return (
    //       <View style={styles.center}>
    //         <Text>Loading...</Text>
    //       </View>
    //     );
    //   }
    
    // console.log(userInfo);
    // const {
    //     name,
    //     phone,
    //     selectedCountry,
    //     selectedCity,
    //     dateOfBirth,
    //     gender,
    //     aboutYourself,
    //     isDonor,
    //     occupation,
    //     photo
    //   } = {
    //     name: "akshay",
    //     phone: "1234567890",
    //     selectedCountry: "India",
    //     selectedCity: "Mumbai",
    //     dateOfBirth: "2000-01-01",
    //     gender: "Male",
    //     aboutYourself: "I am a Donor",
    //     isDonor: "Yes",
    //     occupation: "Software Engineer",
    //     photo: require("../../material/home.png")
    //   };   
           
    
    return (
        <View style={styles.containerMain}>
            <Header title="Profile"/>
        <ScrollView style={styles.containerInfo}>
            <View style={[styles.container, { marginTop: height * 0.12 }]}>
                {userInfo.photoURL ? (
                    // <Image source={{ uri: photo }} style={styles.profileImage} />
                    <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />

                    // <Image source={{ uri: userInfo.photo.uri }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>No Photo</Text>
                    </View>
                )}
    
                <View style={styles.infoContainer}>
                    <Text style={styles.info}><Text style={styles.label}>Name:</Text> {userInfo.name}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Phone:</Text> {userInfo.phone}</Text>
                    <Text style={styles.info}><Text style={styles.label}>City:</Text> {userInfo.selectedCity}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Country:</Text> {userInfo.selectedCountry}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Date of Birth:</Text> {userInfo.dateOfBirth}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Gender:</Text> {userInfo.gender}</Text>
                    <Text style={styles.info}><Text style={styles.label}>About Yourself:</Text> {userInfo.aboutYourself}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Donor Status:</Text> {userInfo.isDonor ? "Yes" : "No"}</Text>
                    <Text style={styles.info}><Text style={styles.label}>Occupation:</Text> {userInfo.occupation}</Text>
                </View>
                <Text style={styles.info}>
                    <Text style={styles.label}>Total Donations:</Text> {count}
                    
                </Text> 
                <Image
                    source={require("../../material/donate.png")}
                    style={{
                    width: "50%",
                    height: "10%",
                    resizeMode: 'contain', // Ensures the entire image is visible within the bounds
                    // marginLeft: 5, // Removed to allow for potential centering or other layout adjustments
                    }}
                    />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EligibilityNavigator")}>
                    <Text style={styles.buttonText}>Register as Donor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletebutton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletebutton} onPress={logout}>
                    <Text style={styles.buttonText}>Logout Profile</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
        );
    }

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        paddingBottom: "20%"
    },
    containerInfo: {
        paddingBottom: "20%",
    },
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
    deletebutton: {
        backgroundColor: "#D81D35",
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