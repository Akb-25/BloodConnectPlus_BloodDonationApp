import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileStep1 from "../screens/Profile/ProfileStep1";
import ProfileStep2 from "../screens/Profile/ProfileStep2";
import ProfileStep3 from "../screens/Profile/ProfileStep3";
import ProfileView from "../screens/Profile/ProfileView";
import { AppNavigator, TabNavigator } from "./AppNavigator";
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="ProfileStep1" component={ProfileStep1} options={{ header: () => <Header title="Profile Step 1" /> }} />
            <Stack.Screen name="ProfileStep2" component={ProfileStep2} options={{ header: () => <Header title="Profile Step 2" /> }} />
            <Stack.Screen name="ProfileStep3" component={ProfileStep3} options={{ header: () => <Header title="Profile Step 3" /> }} />
            <Stack.Screen name="ProfileView" component={ProfileView} options={{ header: () => <Header title="Profile View" /> }} />
            {/* <Stack.Screen name="Home" component={ TabNavigator }/> */}
        </Stack.Navigator>
    );

}