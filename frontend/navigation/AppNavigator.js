import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import WelcomeScreen from "../screens/WelcomeScreen";
import IntroScreen from "../screens/IntroScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
// import BottomTabNavigator from "./BottomTabNavigator";
import ProfileNavigator from "./ProfileNavigator";
import RequestNavigator from "./RequestNavigator";
import EligibilityNavigator from "./EligibilityNavigator";
const Stack = createStackNavigator();

export default function AppNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
                <Stack.Screen name="RequestNavigator" component={RequestNavigator} />
                <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} />
            </Stack.Navigator>
            {/* <BottomTabNavigator/> */}
        </NavigationContainer>
    )
}