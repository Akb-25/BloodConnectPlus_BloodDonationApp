import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { UserContext } from "../../context/UserContext.js";
import { BASE_URL } from "../../constants.js";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header";

export default function DonorDetails({ route, navigation }) {
  const { donor } = route.params;
  const [donorInfo, setDonorInfo] = useState(null);
  const { userId } = useContext(UserContext);
  console.log("The donor right now is: ", donor);
  // useEffect(() => {
  //   const getDonorById = async () => {
  //     try {
  //       const response = await axios.get(`http://192.168.1.4:5000/user/profile/${donor.userId}`);
  //       setDonorInfo(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch donor info:", error);
  //     }
  //   };

  //   getDonorById();
  // }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContact = () => {
    navigation.navigate("ChatScreen", {
      donorId: donor.userId,
      donorName: donor.name,
    });
  };
  const handleScheduleDonation = async () => {
  try {
    console.log("Donor object:", donor);
    console.log("Current User ID:", userId);
    console.log("Receiver User ID (from donor object):", donor.userProfile.userId);

    const donorScheduleResponse = await axios.post(
      BASE_URL + "/donor/schedule-donation-as-donor",
      {
        donorId: userId,
        receiverId: donor.userProfile.userId, 
      }
    );

    if (donorScheduleResponse.status === 200) {
      console.log("Donation scheduled successfully as donor:", donorScheduleResponse.data);

      const receiverScheduleResponse = await axios.post(
        BASE_URL + "/donor/schedule-donation-as-receiver",
        {
          donorId: userId,
          receiverId: donor.userProfile.userId,
        }
      );

      if (receiverScheduleResponse.status === 200) {
        console.log("Donation scheduled successfully as receiver:", receiverScheduleResponse.data);

        Alert.alert(
          "Donation Scheduled",
          `Donation scheduled with ${donor.name} successfully!` 
        );
        navigation.navigate("ScheduledDonation");
      } else {
        console.error("Error scheduling donation as receiver:", receiverScheduleResponse.data);
        Alert.alert("Error", "There was an issue scheduling the donation as a receiver.");
        
      }

    } else {
      console.error("Error scheduling donation as donor:", donorScheduleResponse.data);
      Alert.alert("Error", "There was an issue scheduling the donation as a donor.");
    }
  } catch (error) {
    console.error("Error scheduling donation:", error);
    Alert.alert("Error", "There was an issue scheduling the donation.");
  }
};

  // if (!donorInfo) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading donor details...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title="Schedule Donation" />
        <Text style={styles.title}>Donor Details</Text>

        <Detail label="Name" value={donor.userProfile.name} />
        <Detail label="Phone" value={donor.userProfile.phone} />
        <Detail label="City" value={donor.userProfile.selectedCity} />
        <Detail label="Country" value={donor.userProfile.selectedCountry} />
        <Detail label="Date of Birth" value={donor.userProfile.dateOfBirth} />
        <Detail label="Gender" value={donor.userProfile.gender} />
        <Detail label="Occupation" value={donor.userProfile.occupation} />
        <Detail label="About" value={donor.userProfile.aboutYourself} />
        {/* <Detail label="User ID" value={donorInfo.userId} />
      <Detail label="Name" value={donorInfo.name} />
      <Detail label="Phone" value={donorInfo.phone} />
      <Detail label="City" value={donorInfo.selectedCity} />
      <Detail label="Country" value={donorInfo.selectedCountry} />
      <Detail label="Date of Birth" value={donorInfo.dateOfBirth} />
      <Detail label="Gender" value={donorInfo.gender} />
      <Detail label="Occupation" value={donorInfo.occupation} />
      <Detail label="Is Donor?" value={donorInfo.isDonor ? "Yes" : "No"} />
      <Detail label="About" value={donorInfo.aboutYourself} /> */}
        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={handleScheduleDonation}
        >
          <Text style={styles.buttonText}>Schedule Donation</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleContact}>
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: { flex: 1, backgroundColor: "#fff" },
  title: { 
    alignItems: "center", 
    alignSelf: "center",
    justifyContent: "center", 
    fontSize: 28, 
    fontWeight: "bold", 
    marginTop: "34.5%", 
    marginBottom: "7%" },
  detailContainer: { marginBottom: 12, marginLeft: "10%" },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  buttonConfirm: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginLeft: "10%",
    width: "80%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
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
