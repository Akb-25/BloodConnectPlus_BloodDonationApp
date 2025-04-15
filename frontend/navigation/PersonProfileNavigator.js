import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfileView from "../screens/ProfileView/PersonProfileView";
import ProfileStep1 from "../screens/ProfileView/ProfileStep1";
import ProfileStep2 from "../screens/ProfileView/ProfileStep2";
import ProfileStep3 from "../screens/ProfileView/ProfileStep3";
import PersonProfileUpdate from "../screens/ProfileView/PersonProfileUpdate";
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="PersonProfileView" component={PersonProfileView} options={{ header: () => <Header title="Profile View" /> }} />
            <Stack.Screen name="UpdateProfileStep1" component={ProfileStep1} options={{ header: () => <Header title="Profile Step 1" /> }} />
            <Stack.Screen name="UpdateProfileStep2" component={ProfileStep2} options={{ header: () => <Header title="Profile Step 2" /> }} />
            <Stack.Screen name="UpdateProfileStep3" component={ProfileStep3} options={{ header: () => <Header title="Profile Step 3" /> }} />
            <Stack.Screen name="PersonProfileUpdate" component={PersonProfileUpdate} options={{ header: () => <Header title="Profile View" /> }} />
        </Stack.Navigator>
    );
}