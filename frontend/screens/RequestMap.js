import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";

export default function RequestMap({ route, navigation }) {
  const { selectedCity, selectedBloodGroup } = route.params;
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.0.105:5000/donors/get-donor-city/${selectedCity}/${selectedBloodGroup}`)
      .then((response) => {
        console.log("Donor response:", response.data);
  
        setTimeout(() => {
          setDonors(response.data); // ✅ now we are setting actual data
        }, 5000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
      });
  }, [selectedCity, selectedBloodGroup]);

  const handleDonorPress = (donor) => {
    navigation.navigate("DonorDetails", { donor });
  };

  const handleSendRequest = async (donor) => {
    try {
      const response = await axios.post(
        "http://192.168.0.105:5000/request/upload-connection",
        {
          userId: donor.userId,
          requestorId: userId,
        }
      );
      Alert.alert("Request Sent"," Request sent to ${donor.name} successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      Alert.alert("Error", "There was an issue sending the request.");
    }
  };

  const handleContact = (donor) => {
    navigation.navigate("ChatScreen", {
      donorId: donor.userId,
      donorName: donor.name,
    });
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
            description={"Blood Group: ${donor.bloodGroup}"}
            onPress={() => setSelectedDonor(donor)}
          />
        ))}
      </MapView>

      {selectedDonor && (
        <View style={styles.pickerCard}>
          <Text style={styles.donorText}>Name: {selectedDonor.name}</Text>
          <Text style={styles.donorText}>Age: {selectedDonor.age}</Text>
          <Text style={styles.donorText}>Blood Group: {selectedDonor.bloodGroup}</Text>
          <Text style={styles.donorText}>Gender: {selectedDonor.gender}</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Selected Blood Group: {selectedBloodGroup}
          </Text>
          <Text style={styles.footerText}>Selected City: {selectedCity}</Text>
          <Text style={styles.footerText}>Available People:</Text>
          {donors.map((donor, index) => (
            <View key={index} style={styles.donorCard}>
              <Text style={styles.donorText}>Name: {donor.name}</Text>
              <Text style={styles.donorText}>Age: {donor.age}</Text>
              <Text style={styles.donorText}>Blood Group: {donor.bloodGroup}</Text>
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
            </View>
          ))}
        </View>
        <Button title="Home" style={styles.button} onPress={() => navigation.navigate("Home", {screen:"HomeScreen"})}></Button>
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
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
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
});
