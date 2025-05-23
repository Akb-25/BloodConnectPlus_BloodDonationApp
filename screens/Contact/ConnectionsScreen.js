import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext.js";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header.js";
import { useWindowDimensions } from "react-native";
import { BASE_URL } from "../../constants.js";

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
          // axios.get(BASE_URL+`/request/get-requests/${userId}`),
          axios.get(BASE_URL+`/request/get-requests-sent/${userId}`),
          axios.get(BASE_URL+`/request/get-requests/${userId}`)
        ]);
        setConnections(received.data);
        setRequestedUsers(sent.data);
      } catch (error) {
        console.log(BASE_URL+`/request/get-requests/${userId}`);
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReviewRequest = (donor) => {
    Alert.alert(
      "Confirm Donation",
      `Do you want to review the donation request from ${donor.userProfile.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => navigation.navigate("DonorDetails", { donor }) }
      ]
    );
  };

  const handleChat = (person) => {
    console.log("Person: ",person);
    console.log(person.userProfile.name);
    let otherId = person.receiverId;
    if(userId === person.receiverId){
      otherId = person.senderId;
    }
    navigation.navigate("ChatScreen2", {
      userId: userId,
      otherId: otherId,
      otherName: person.userProfile.name
    });
  };

  const dataToShow = selectedTab === "received" ? connections : requestedUsers;
  console.log("Data to show: ", dataToShow);
  console.log("Connections: ", connections);
  console.log("Requested Users: ", requestedUsers);
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!dataToShow || dataToShow.length === 0) {
    return (
      // <View style={styles.center}>
      //   <Text>
      //     {selectedTab === "received"
      //       ? "No requests received yet."
      //       : "You haven't requested anyone yet."}
      //   </Text>
      // </View>
      <View style={[styles.full, { paddingTop: headerHeight, marginBottom: height * 0.08 }]}>
      <Header title="Connections"/>
      <View style={styles.toggleContainer}>
  <TouchableOpacity
    style={[styles.toggleButton, selectedTab === "received" && styles.activeTab]}
    onPress={() => setSelectedTab("received")}
  >
    <Text
      style={[
        styles.toggleText,
        { color: selectedTab === "received" ? "#fff" : "#000" }
      ]}
    >
      Requests Received
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.toggleButton, selectedTab === "sent" && styles.activeTab]}
    onPress={() => setSelectedTab("sent")}
    >
      <Text
        style={[
          styles.toggleText,
          { color: selectedTab === "sent" ? "#fff" : "#000" }
        ]}
      >
        Requests Sent
      </Text>
    </TouchableOpacity>
    </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {selectedTab === "received" ? "People Who Requested You" : "People You Requested"}
        </Text>
        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          {selectedTab === "received"
            ? "No requests received yet."
            : "You haven't requested anyone yet."}
        </Text>
      </ScrollView>
    </View>
  );
}
    // );
  // }

  return (
    
    <View style={[styles.full, { paddingTop: headerHeight, marginBottom: height * 0.08 }]}>
      <Header title="Connections"/>
      <View style={styles.toggleContainer}>
  <TouchableOpacity
    style={[styles.toggleButton, selectedTab === "received" && styles.activeTab]}
    onPress={() => setSelectedTab("received")}
  >
    <Text
      style={[
        styles.toggleText,
        { color: selectedTab === "received" ? "#fff" : "#000" }
      ]}
    >
      Requests Received
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.toggleButton, selectedTab === "sent" && styles.activeTab]}
    onPress={() => setSelectedTab("sent")}
    >
      <Text
        style={[
          styles.toggleText,
          { color: selectedTab === "sent" ? "#fff" : "#000" }
        ]}
      >
        Requests Sent
      </Text>
    </TouchableOpacity>
    </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {selectedTab === "received" ? "People Who Requested You" : "People You Requested"}
        </Text>

        {dataToShow.map((person, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{person.userProfile.name}</Text>
            <Text>City: {person.userProfile.selectedCity}</Text>
            <Text>Date of Birth: {person.userProfile.dateOfBirth}</Text>

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
                <Text style={styles.buttonText2}>Chat</Text>
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
    backgroundColor: "#FFF"
  },
  activeTab: {
    backgroundColor: "#D81D35",

  },
  toggleText: {
    color: "#FFF",
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
    backgroundColor: "#fff",
    color: "",
    borderRadius: 1,
    borderBlockColor: "000"
  },
  chatButton: {
    backgroundColor: "#D81D35",
    width: "70%",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonText2: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});
