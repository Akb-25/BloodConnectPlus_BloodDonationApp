import axios from "axios";
import React, { useEffect, useState , useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext.js";

export default function DonorDetails({ route, navigation }) {
  const { donor } = route.params;
  const [donorInfo, setDonorInfo] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    
    const getDonorById = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5000/user/profile/${donor.userId}`);
        setDonorInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch donor info:", error);
      }
    };

    getDonorById();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContact = () => {
    navigation.navigate("ChatScreen", {
      donorId: donor.userId,
      donorName: donor.name
    });
  };

  if (!donorInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading donor details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donor Details</Text>

      <Detail label="User ID" value={donorInfo.userId} />
      <Detail label="Name" value={donorInfo.name} />
      <Detail label="Phone" value={donorInfo.phone} />
      <Detail label="City" value={donorInfo.selectedCity} />
      <Detail label="Country" value={donorInfo.selectedCountry} />
      <Detail label="Date of Birth" value={donorInfo.dateOfBirth} />
      <Detail label="Gender" value={donorInfo.gender} />
      <Detail label="Occupation" value={donorInfo.occupation} />
      <Detail label="Is Donor?" value={donorInfo.isDonor ? "Yes" : "No"} />
      <Detail label="About" value={donorInfo.aboutYourself} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>⬅️ Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <Text style={styles.buttonText}>📞 Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Detail = ({ label, value }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  detailContainer: { marginBottom: 12 },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});