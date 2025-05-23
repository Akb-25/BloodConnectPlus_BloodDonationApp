import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EligibilityResult from "../screens/Eligibility/EligibilityResult";
import EligibilityScreen from "../screens/Eligibility/EligibilityScreen";

const Stack = createStackNavigator();

export default function EligibilityNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="EligibilityScreen" component={EligibilityScreen} /> 
            <Stack.Screen name="EligibilityResult" component={EligibilityResult} /> 
        </Stack.Navigator>
    );
}