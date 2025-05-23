import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, Image, View, useWindowDimensions } from "react-native";
import Header, { HEADER_HEIGHT_PERCENT } from "../../components/Header";
import ImageCard from "../../components/ImageCard";
import { UserContext } from "../../context/UserContext";

function donorStatus() {
  return "You are eligible to donate";
}


export default function HomeScreen({ navigation }) {
  const { userId } = useContext(UserContext);
  const { width, height } = useWindowDimensions();
  const headerHeight = height * HEADER_HEIGHT_PERCENT;
  console.log("The user id here is: ", userId);
  
  return (
    <View style={{ flex: 1}}>
      <Header title="BloodConnect+" />
      <ScrollView style={[styles.container, { paddingTop: headerHeight, marginBottom: height * 0.08 }]}>
        {/* <Image source={require("../../assets/images/placeholder.png")} style={styles.locationImage} />
        
        <Text style={styles.locationText}>Bangalore</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require("../../assets/images/placeholder.png")} style={styles.locationImage} />
          <Text style={styles.locationText}>Bangalore</Text>
        </View>
        <Image source={require("../../assets/images/home-img.jpg")} style={styles.imageHero} />
        
        <Text style={styles.donorStatusContent}>{donorStatus()}</Text>

        
        <ImageCard
          img={require("../../assets/images/maindonor-card.png")}
          title="Find Donor"
          navigation={navigation}
          redirectLink="RequestNavigator" 
        />
        <ImageCard
          img={require("../../assets/images/schedule.png")}
          title="Scheduled Donation"
          navigation={navigation}
          redirectLink="ScheduledDonation" 
        />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    // flex: 1,
    backgroundColor: "#f5f5f5",
  },
  locationImage: {
  width: 20,
  height: 20,
  marginLeft: 15,
  marginRight: 5,
  },
  locationText: {
    fontSize: 18,
    color: "#000",
    textAlign: "left",
    marginVertical: 10,
    fontWeight: "bold",
  },
  imageHero: {
    width: "95%",
    alignSelf: "center",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    borderBlockColor: "#D81D35",
    elevation: 5,
    // borderWidth: 1,
    // borderColor: "#D81D35",
    shadowOffset: { width: 0, height: 0 },
        shadowColor: '#D81D35',
        shadowOpacity: 0.5,
        shadowRadius: 5,
    marginVertical: 10,
  },
  donorStatusContent: {
    backgroundColor: "#D81D35",
    borderRadius: 10,
    fontSize: 16,
    width: "80%",
    alignSelf: "center",
    color: "#fff",
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

