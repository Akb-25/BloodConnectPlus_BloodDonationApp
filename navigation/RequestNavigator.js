import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RequestScreen from "../screens/Request/RequestScreen";
import ConfirmRequest from "../screens/Request/ConfirmRequest";
import RequestMap from "../screens/Request/RequestMap";

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
