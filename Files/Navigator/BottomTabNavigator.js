import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import IntroScreen from "../screens/IntroScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
        screenOptions = {({route}) => ({
            tabBarIcon: ({ focused }) => {
                let iconSource;
                if (route.name === "Home") {
                    iconSource = require("../assets/images/home-nav.png");
                } else if (route.name === "Find Donor") {
                    iconSource = require("../assets/images/home-nav.png");
                } else if (route.name === "Request") {
                    iconSource = require("../assets/images/home-nav.png");
                } else if (route.name === "Profile") {
                    iconSource = require("../assets/images/home-nav.png");
                }
                return <Image source={iconSource} style={{ width: 25, height: 25 }} />
            }
        })}
        >
            <Tab.Screen name="Home" component={IntroScreen} />
            <Tab.Screen name="Find Donor" component={RegisterScreen} />
            <Tab.Screen name="Request" component={LoginScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    )
}
