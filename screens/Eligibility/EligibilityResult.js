import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header";
import axios from "axios";
import { db } from "../../config/firebase.js";
import { UserContext } from "../../context/UserContext.js";
import { BASE_URL } from "../../constants.js";
export default function EligibilityResult({ navigation, route }) {
  const { eligible, latitude, longitude } = route.params;
  const { userId } = useContext(UserContext);

  const [bloodGroup, setBloodGroup] = useState("");
  const city = "Bangalore";

  const uploadDonorInfo = async () => {
    if (!bloodGroup) return; // Prevent upload if blood group not selected

    const response = await axios.post(BASE_URL+"/donor/upload-donor", {
      userId,
      canDonate: true,
      city,
      latitude,
      longitude,
      bloodGroup, // send selected blood group
    });
    if (response.status === 200) {
      console.log("Donor info uploaded successfully:", response.data);
      navigation.navigate("Home");
    }
    else {
      console.error("Error uploading donor info:", response.data);
      Alert.alert("Error", "There was an issue uploading your donor information.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Eligibility Result" />
      <Text style={[styles.resultText, eligible ? styles.eligibleText : styles.notEligibleText]}>
        {eligible ? "🎉 You are eligible to donate blood!" : "❌ Sorry, you are not eligible."}
      </Text>

      <Text style={{ marginVertical: 10 }}>City: {city}</Text>

      {eligible && (
        <>
          <Text style={{ marginBottom: 5 }}>Select Blood Group:</Text>
          <Picker
            selectedValue={bloodGroup}
            style={styles.picker}
            onValueChange={(itemValue) => setBloodGroup(itemValue)}
          >
            <Picker.Item label="-- Select Blood Group --" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>

          <TouchableOpacity
            style={[styles.button, !bloodGroup && { backgroundColor: "#999" }]}
            onPress={uploadDonorInfo}
            disabled={!bloodGroup}
          >
            <Text style={styles.buttonText}>Upload Donor Info</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={[styles.button, { backgroundColor: "#999"  }]} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingTop: HEADER_HEIGHT_PERCENT * 100 + 30,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: "60%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  eligibleText: {
    color: "#27ae60", // clean elegant green
  },
  notEligibleText: {
    color: "#c0392b", // softer deep red
  },
  cityText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 8,
    color: "#333",
  },
  picker: {
    width: "100%",
    backgroundColor: "#f4f6f7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27ae60", // modern purple
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#dcdde1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});