import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";
import Header, { HEADER_HEIGHT_PERCENT } from "../components/Header";
import { useWindowDimensions } from "react-native";

export default function ConnectionsScreen({ navigation }) {
  const { userId } = useContext(UserContext);
  const [connections, setConnections] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("received");
  const { height } = useWindowDimensions();
  const headerHeight = height * HEADER_HEIGHT_PERCENT;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [received, sent] = await Promise.all([
          axios.get(`http://192.168.1.6:5000/requests/get-requests/${userId}`),
          axios.get(`http://192.168.1.6:5000/requests/get-requests-sent/${userId}`)
        ]);
        setConnections(received.data);
        setRequestedUsers(sent.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReviewRequest = (donor) => {
    Alert.alert(
      "Confirm Donation",
      `Are you sure you want to donate to ${donor.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => navigation.navigate("DonorDetails", { donor }) }
      ]
    );
  };

  const handleChat = (person) => {
    navigation.navigate("ChatScreen", {
      donorId: person.userId,
      donorName: person.name
    });
  };

  const dataToShow = selectedTab === "received" ? connections : requestedUsers;

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (dataToShow.length === 0) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>
  //         {selectedTab === "received"
  //           ? "No requests received yet."
  //           : "You haven't requested anyone yet."}
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    
    <View style={[styles.full, { paddingTop: headerHeight }]}>
      <Header title="Connections"/>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === "received" && styles.activeTab]}
          onPress={() => setSelectedTab("received")}
        >
          <Text style={styles.toggleText}>Requests Received</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === "sent" && styles.activeTab]}
          onPress={() => setSelectedTab("sent")}
        >
          <Text style={styles.toggleText}>Requests Sent</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {selectedTab === "received" ? "People Who Requested You" : "People You Requested"}
        </Text>

        {dataToShow.map((person, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{person.name}</Text>
            <Text>City: {person.selectedCity}</Text>
            <Text>Blood Group: {person.bloodGroup}</Text>

            <View style={styles.buttonRow}>
              {selectedTab === "received" && (
                <TouchableOpacity
                  style={[styles.button, styles.reviewButton]}
                  onPress={() => handleReviewRequest(person)}
                >
                  <Text style={styles.buttonText}>Review Request</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.chatButton]}
                onPress={() => handleChat(person)}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#fff"
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2"
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#ccc"
  },
  activeTab: {
    backgroundColor: "#007AFF"
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold"
  },
  container: {
    padding: 16
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
