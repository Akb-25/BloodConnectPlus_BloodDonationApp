import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import { db } from "../config/firebase.js";
import { UserContext } from "../context/UserContext.js";

export default function EligibilityResult({ navigation, route }) {
  const { eligible, latitude, longitude } = route.params;
  const { userId } = useContext(UserContext);

  const [bloodGroup, setBloodGroup] = useState("");
  const city = "Bangalore";

  const uploadDonorInfo = () => {
    if (!bloodGroup) return; // Prevent upload if blood group not selected

    axios.post("http://192.168.0.105:5000/donor/upload-donor", {
      userId,
      canDonate: true,
      city,
      latitude,
      longitude,
      bloodGroup, // send selected blood group
    });

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  resultText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  eligibleText: {
    color: "#28a745",
  },
  notEligibleText: {
    color: "#dc3545",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  picker: {
    width: "80%",
    height: 50,
    marginVertical: 10,
  },
});