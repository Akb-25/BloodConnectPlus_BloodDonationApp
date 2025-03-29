import React from "react";
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";

function donorStatus() {
  return "You are eligible to donate";
}

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="Home Screen" />
      <Text style={styles.locationText}>Bangalore</Text>
      <Image source={require("../assets/images/home-image-main.png")} style={styles.imageHero} />
      
      <Text style={styles.donorStatusContent}>{donorStatus()}</Text>


      <ImageCard img={require("../assets/images/maindonor-card.png")} />
      <ImageCard img={require("../assets/images/bloodbank-card.png")} />
      <ImageCard img={require("../assets/images/hospital-card.png")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  locationText: {
    fontSize: 18,
    color: "#007BFF",
    textAlign: "center",
    marginVertical: 10,
  },
  imageHero: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 10,
  },
  donorStatusContent: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

