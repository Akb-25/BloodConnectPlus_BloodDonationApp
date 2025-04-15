import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, Image, View, useWindowDimensions } from "react-native";
import Header, { HEADER_HEIGHT_PERCENT } from "../components/Header";
import ImageCard from "../components/ImageCard";
import { UserContext } from "../context/UserContext";
function donorStatus() {
  return "You are eligible to donate";
}


export default function HomeScreen({ navigation }) {
  const { setUserId } = useContext(UserContext);
  const { width, height } = useWindowDimensions();
  const headerHeight = height * HEADER_HEIGHT_PERCENT;

  useEffect(() => {
    setUserId("njdsnk");
  }, []);

  return (
    <View style={{ flex: 1}}>
      <Header title="Home Screen" />
      <ScrollView style={[styles.container, { paddingTop: headerHeight }]}>
      
      <Text style={styles.locationText}>Bangalore</Text>
      <Image source={require("../assets/images/home-img.jpg")} style={styles.imageHero} />
      
      <Text style={styles.donorStatusContent}>{donorStatus()}</Text>


      <ImageCard
        img={require("../assets/images/maindonor-card.png")}
        title="Find Donor"
        navigation={navigation}
        redirectLink="RequestNavigator" 
      />
      {/* <ImageCard img={require("../assets/images/bloodbank-card.png")} />
      <ImageCard img={require("../assets/images/hospital-card.png")} /> */}
      </ScrollView>
    </View>
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

