import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EligibilityResult from "../screens/EligibilityResult";
import EligibilityScreen from "../screens/EligibilityScreen";

const Stack = createStackNavigator();

export default function EligibilityNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="EligibilityScreen" component={EligibilityScreen} /> 
            <Stack.Screen name="EligibilityResult" component={EligibilityResult} /> 
        </Stack.Navigator>
    );
}