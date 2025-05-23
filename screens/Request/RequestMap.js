import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  useWindowDimensions
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { UserContext } from "../../context/UserContext.js";
import { BASE_URL } from "../../constants.js";

export default function RequestMap({ route, navigation }) {
  const { selectedCity, selectedBloodGroup, selectedCountry } = route.params;
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const { width, height } = useWindowDimensions();
  console.log(selectedCity);
  console.log(selectedBloodGroup);
  console.log(selectedCountry);
  const [filterType, setFilterType] = useState("city");

  useEffect(() => {
    let url = "";

    // Construct the URL based on the filterType
    if (filterType === "city") {
      url = `${BASE_URL}/donor/get-donor-city/${selectedCity}/${selectedBloodGroup}`;
    } else if (filterType === "country") {
      url = `${BASE_URL}/donor/get-donor-country/${selectedCountry}/${selectedBloodGroup}`;
    } else if (filterType === "world") {
      url = `${BASE_URL}/donor/get-donor-world/${selectedBloodGroup}`;
    }
    
    // Make the API call using the constructed URL
    axios
      .get(url) // Changed this line to use the 'url' variable
      .then((response) => {
        console.log("Donor response:", response.data);
        setDonors(response.data); 
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
      });
  }, [filterType, selectedCity, selectedBloodGroup, selectedCountry]); // Added selectedCountry to dependencies

  const handleDonorPress = (donor) => {
    navigation.navigate("DonorDetails", { donor });
  };

  const handleSendRequest = async (donor) => {
    try {
      const response = await axios.post(
        BASE_URL+"/request/upload-connection",
        {
          senderId: userId,
          receiverId: donor.userId,
        }
      );
      if (response.status === 200) {
        console.log("Request sent successfully:", response.data);
        Alert.alert("Request Sent",` Request sent to ${donor.name} successfully!`);
      }
      else {
        console.error("Error sending request:", response.data);
        Alert.alert("Error", "There was an issue sending the request.");
      }
      
    } catch (error) {
      console.error("Error sending request:", error);
      Alert.alert("Error", "There was an issue sending the request.");
    }
  };

  const handleContact = async (donor) => {
    const response = await axios.post(BASE_URL+"/request/upload-connection", {
      senderId: userId,
      receiverId: donor.userId
    })
    if (response.status === 200) {
      console.log("Request sent successfully:", response.data);
      Alert.alert("Request Sent",` Request sent to ${donor.name} successfully!`);
      navigation.navigate("ChatScreen", {
        otherId: donor.userId,
        otherName: donor.name,
      });
    }
    else {
      console.error("Error sending request:", response.data);
      Alert.alert("Error", "There was an issue sending the request.");
    }
    
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {donors.map((donor, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: donor.latitude,
              longitude: donor.longitude,
            }}
            title={donor.name}
            description={`Age: ${donor.dateOfBirth}, Gender: ${donor.gender}`}
            onPress={() => setSelectedDonor(donor)}
          />
        ))}
      </MapView>
      <View style={{ width: "100%", padding: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Filter donors by:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(itemValue) => setFilterType(itemValue)}
          style={{ backgroundColor: "#eee", borderRadius: 10 }}
        >
          <Picker.Item label="City" value="city" />
          <Picker.Item label="Country" value="country" />
          <Picker.Item label="World" value="world" />
        </Picker>
      </View>
      {selectedDonor && (
        <View style={styles.pickerCard}>
          <Text style={styles.donorText}>Name: {selectedDonor.name}</Text>
          <Text style={styles.donorText}>Age: {selectedDonor.dateOfBirth}</Text>
          {/* <Text style={styles.donorText}>Blood Group: {selectedDonor.bloodGroup}</Text> */}
          <Text style={styles.donorText}>Gender: {selectedDonor.gender}</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView }>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Selected Blood Group: {selectedBloodGroup}
          </Text>
          <Text style={styles.footerText}>Selected City: {selectedCity}</Text>
          <Text style={styles.footerText}>Available Donors:</Text>
            {donors.map((donor, index) => (
              <ScrollView key={index} style={styles.donorCard} onPress={() => handleDonorPress(donor)}>
                <Text style={styles.donorText}>Name: {donor.name}</Text>
                <Text style={styles.donorText}>Age: {donor.dateOfBirth}</Text>
                {/* <Text style={styles.donorText}>Blood Group: {donor.bloodGroup}</Text> */}
                <Text style={styles.donorText}>Gender: {donor.gender}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleContact(donor)}
                  >
                    <Text style={styles.buttonText}>💬 Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSendRequest(donor)}
                  >
                    <Text style={styles.buttonText}>📩 Send Request</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ))}
        </View>
        <Button title="Home" style={styles.homebutton} onPress={() => navigation.navigate("Home", {screen:"HomeScreen"})}></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  pickerCard: {
    position: "absolute",
    top: "45%",
    left: "5%",
    right: "5%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  footerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  donorCard: {
    backgroundColor: "#eee",
    marginBottom: 25,
    padding: 10,
    borderRadius: 15,
    width: "100%",
  },
  donorText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  homebutton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 50,
  },
});
