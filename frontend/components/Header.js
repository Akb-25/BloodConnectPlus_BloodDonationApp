import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";

const Header = ({ title }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.header, {width}]}>
            <Image
            source = {require("../assets/images/header-img.png")}
            style = {[styles.headerImage, {width}]}
            resizeMode = "cover"

            />
            <Text style={styles.headerText}>{title}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      },
      headerImage: {
        height: "100%",
        position: "absolute",
      },
      headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
});

export default Header;


