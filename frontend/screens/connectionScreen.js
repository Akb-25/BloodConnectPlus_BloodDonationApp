import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";

export default function ConnectionsScreen({ navigation }) {
  const { userId } = useContext(UserContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5000/requests/get-requests/${userId}`);
        setConnections(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching connections:", error);
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  const handleReviewRequest = (donor) => {
    Alert.alert(
      "Confirm Donation",
      `Are you sure you want to donate to ${donor.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            navigation.navigate("DonorDetails", { donor });
          }
        }
      ]
    );
  };

  const handleChat = (donor) => {
    navigation.navigate("ChatScreen", {
      donorId: donor.userId,
      donorName: donor.name
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading connections...</Text>
      </View>
    );
  }

  if (connections.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No requests received yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>People Who Requested You</Text>
      {connections.map((donor, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{donor.name}</Text>
          <Text>City: {donor.selectedCity}</Text>
          <Text>Blood Group: {donor.bloodGroup}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.reviewButton]}
              onPress={() => handleReviewRequest(donor)}
            >
              <Text style={styles.buttonText}>Review Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.chatButton]}
              onPress={() => handleChat(donor)}
            >
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  reviewButton: {
    backgroundColor: "#28a745"
  },
  chatButton: {
    backgroundColor: "#007AFF"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});