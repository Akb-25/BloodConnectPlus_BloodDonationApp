import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import MapView from "react-native-maps";

export default function RequestMap(route, navigation) {

//   const { selectedCity, selectedBloodGroup } = route.params;
  const selectedCity = "New York";
  const selectedBloodGroup = "O+";
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Selected Blood Group: {selectedBloodGroup}
          </Text>
          <Text style={styles.footerText}>
            Selected City: {selectedCity}
          </Text>
          <Text style={styles.footerText}>Available People:</Text>
          {/* List of available people will be rendered here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: "100%",
    height: "60%"
  },
  scrollView: {
    flex: 1,
    padding: 10
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  footerText: {
    fontSize: 16,
    marginBottom: 10,
  }
});

