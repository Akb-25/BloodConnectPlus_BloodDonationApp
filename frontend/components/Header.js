import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";

const Header = ({ title }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.header, { width }]}>
            <Image
                source={require("../assets/images/header-img.png")}
                style={[styles.headerImage, { width }]}
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
        height: 100,
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