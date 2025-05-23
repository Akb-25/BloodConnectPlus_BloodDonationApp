import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions, 
  Alert,
} from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../constants";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header";
import { useWindowDimensions } from "react-native";

export default function ScheduledDonation({ navigation }) {
  const { userId } = useContext(UserContext);

  const [donorData, setDonorData] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [donorIdentity, setDonorIdentity] = useState(null);
  const [receiverIdentity, setReceiverIdentity] = useState(null);

  const [currentView, setCurrentView] = useState("donor");
  const { width, height } = useWindowDimensions();
  const headerHeight = height * HEADER_HEIGHT_PERCENT;

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/donor/get-scheduled-donation-as-donor?userId=${userId}`);
        if (res.data.length > 0) {
          setDonorData(res.data[0]);
          const other = res.data[0].receiverId;
          const idRes = await axios.get(`${BASE_URL}/request/get-request/${other}`);
          setDonorIdentity(idRes.data);
        }
      } catch (err) {
        console.log("Donor fetch error:", err);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/donor/get-scheduled-donation-as-receiver?userId=${userId}`);
        if (res.data.length > 0) {
          setReceiverData(res.data[0]);
          const other = res.data[0].donorId;
          const idRes = await axios.get(`${BASE_URL}/request/get-request/${other}`);
          setReceiverIdentity(idRes.data);
        }
      } catch (err) {
        console.log("Receiver fetch error:", err);
      }
    };

    fetchDonor();
    fetchReceiver();
  }, [userId]);

  const confirmDonation = async (type) => {
    const dataToUse = type === "donor" ? donorData : receiverData;

    if (!dataToUse) {
      Alert.alert("Error", `No scheduled donation found to confirm as ${type}.`);
      return;
    }

    const payload = {
      userId,
      otherId: type === "donor" ? dataToUse.receiverId : dataToUse.donorId,
    };

    const url = type === "donor"
      ? "/donor/confirm-donation-as-donor"
      : "/donor/confirm-donation-as-receiver";

    try {
      const res = await axios.post(BASE_URL + url, payload);
      if (res.status === 200) {
        Alert.alert("Confirmed", "Donation confirmed successfully!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", `Failed to confirm donation as ${type}. Please try again.`);
      }
    } catch (e) {
      console.error(`Confirm donation error as ${type}:`, e); 
      Alert.alert("Error", "There was an issue confirming the donation.");
    }
  };

  const cancelDonation = async (type) => {
     const dataToUse = type === "donor" ? donorData : receiverData;

    if (!dataToUse) {
      Alert.alert("Error", `No scheduled donation found to cancel as ${type}.`);
      return;
    }

    const payload = {
      userId,
      otherId: type === "donor" ? dataToUse.receiverId : dataToUse.donorId,
    };

    const url = type === "donor"
      ? "/donor/cancel-donation-as-donor"
      : "/donor/cancel-donation-as-receiver";

    try {
      const res = await axios.post(BASE_URL + url, payload);
      if (res.status === 200) {
        Alert.alert("Cancelled", "Donation cancelled");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", `Failed to cancel donation as ${type}. Please try again.`);
      }
    } catch (e) {
      console.error(`Cancel donation error as ${type}:`, e); // Use console.error for errors
      Alert.alert("Error", "There was an issue cancelling the donation.");
    }
  };
  const reportUser = async () => {
  Alert.alert(
    "Report User",
    "Are you sure you want to report this user? This action cannot be undone.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => { 
          Alert.alert("Reported", "User has been reported successfully.");
          
          navigation.navigate("Home");
        },
      },
    ]
  );
};

  function Field({ label, value }) {
    return (
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    );
  }

  const DonationView = ({ identity, type, onConfirm, onCancel }) => {
    if (!identity) return <Text style={styles.emptyText}>No scheduled donation found.</Text>; // More descriptive

    return (
      <View style={{ alignItems: "center" }}> 
        <View style={styles.card}>
          <Field label="Recipient Name" value={identity.recipientName} />
          <Field label="Phone" value={identity.recipientPhone} />
          <Field label="City" value={identity.recipientSelectedCity} />
          <Field label="Country" value={identity.recipientSelectedCountry} />
          <Field label="Date" value={identity.date ? new Date(identity.date).toLocaleDateString() : "N/A"} />
          <Field label="Time" value={identity.time ? new Date(`2000/01/01 ${identity.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"} />
          <Field label="Blood Group" value={identity.bloodGroup} />
          <Field label="Gender" value={identity.gender} />
          <Field label="Hospital" value={identity.hospitalName} />
          <Field label="Address" value={identity.address} />
          <Field label="Amount" value={identity.amountOfBlood} />
          <Field label="Reason" value={identity.reason} />
          <Field label="Contact Name" value={identity.contactPersonName} />
          <Field label="Contact Phone" value={identity.contactPersonPhone} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="BloodConnect+" />

      <ScrollView style={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() =>
            setCurrentView((prev) => (prev === "donor" ? "receiver" : "donor"))
          }
        >
          <Text style={styles.toggleText}>
            View as {currentView === "donor" ? "Receiver" : "Donor"}
          </Text>
        </TouchableOpacity>

        {currentView === "donor" ? (
          <DonationView identity={donorIdentity} type="donor" />
        ) : (
          <DonationView identity={receiverIdentity} type="receiver" />
        )}
      </ScrollView>

      {(currentView === "donor" && donorIdentity) || (currentView === "receiver" && receiverIdentity) ? (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => confirmDonation(currentView)}>
            <Text style={styles.buttonText}>🚑 Confirm Donation</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => cancelDonation()}>
            <Text style={styles.cancelText}>Cancel Donation</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => reportUser(currentView)}>
            <Text style={styles.cancelText}>Report User</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    
  },
  scrollViewContent: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: Dimensions.get('window').height * HEADER_HEIGHT_PERCENT,
  },
  card: {
    width: "100%", 
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    elevation: 3,
    marginBottom: 20, 
  },
  fieldRow: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: "bold",
    color: "#111827",
  },
  fieldValue: {
    color: "#6b7280",
  },
  bottomButtonsContainer: {
    width: '100%',
    padding: 20, // Padding for the buttons themselves
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Match background or make it stand out
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute', // Fix at the bottom
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#D81D35",
    padding: 12,
    borderRadius: 12,
    // marginTop: 20, // Removed as padding on container will handle spacing
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    marginTop: 15,
    color: "#d32f2f",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50, // Reduced to be closer to content
    fontSize: 18,
    color: "#D81D35",
  },
  toggleButton: {
    backgroundColor: "#D81D35",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10, // Add some top margin to separate from header
  },
  toggleText: {
    color: "white",
    fontWeight: "bold",
  },
});