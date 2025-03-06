import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../components/Header"; 
export default function HomeScreen({ navigation }) {
    return ( // ✅ Added return statement
      <View style={styles.container}>
        <Header title="Home Screen" /> {/* ✅ Added a title prop */}
        <Button 
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });