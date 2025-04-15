import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";

const Header = ({ title }) => {
  const { width, height } = useWindowDimensions();
  const headerHeight = height * 0.12; // 12% of screen height

  return (
    <View style={[styles.header, { width, height: headerHeight }]}>
      <Image
        source={require("../assets/images/header-img.png")}
        style={[styles.headerImage, { width, height: headerHeight }]}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    headerImage: {
        height: "100%",
        position: "absolute",
    },
    headerText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Header;
export const HEADER_HEIGHT_PERCENT = 0.12;
