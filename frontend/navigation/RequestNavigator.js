import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RequestScreen from "../screens/RequestScreen";
import ConfirmRequest from "../screens/ConfirmRequest";
import RequestMap from "../screens/RequestMap";

const Stack = createStackNavigator();

export default function RequestNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="RequestScreen" component={RequestScreen} />
            <Stack.Screen name="ConfirmRequest" component={ConfirmRequest} />
            <Stack.Screen name="RequestMap" component={RequestMap} />
        </Stack.Navigator>
    );
}
