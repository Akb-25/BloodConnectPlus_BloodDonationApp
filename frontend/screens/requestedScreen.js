import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";

export default function RequestedScreen({ navigation }) {
  const { userId } = useContext(UserContext);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestedUsers = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5000/requests/get-requests-sent/${userId}`);
        setRequestedUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requested users:", error);
        setLoading(false);
      }
    };
    fetchRequestedUsers();
  }, []);

  const handleChat = (person) => {
    navigation.navigate("ChatScreen", {
      donorId: person.userId,
      donorName: person.name
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading requested users...</Text>
      </View>
    );
  }

  if (requestedUsers.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You haven't requested anyone yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>People You Requested</Text>
      {requestedUsers.map((person, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{person.name}</Text>
          <Text>City: {person.selectedCity}</Text>
          <Text>Blood Group: {person.bloodGroup}</Text>

          <TouchableOpacity
            style={[styles.button, styles.chatButton]}
            onPress={() => handleChat(person)}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
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
  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8
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