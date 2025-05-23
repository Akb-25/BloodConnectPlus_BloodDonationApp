import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ title, subtitle }) => {
  const { width, height } = useWindowDimensions();
  const headerHeight = height * 0.14;

  return (
    <LinearGradient
      colors={["#B81D35", "#B81D35"]}
      style={[styles.header, { width, height: headerHeight }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.headerText}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </LinearGradient>
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
    paddingHorizontal: 20,
    paddingTop: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1000,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1.2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#fcdede",
    marginTop: 4,
  },
});

export default Header;
export const HEADER_HEIGHT_PERCENT = 0.14;