import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatDonors  from "../screens/ChatDonors";
import ChatScreen  from "../screens/ChatScreen";
import ConnectionsScreen from "../screens/ConnectionsScreen";

const Stack = createStackNavigator();

export default function ChatNavigator({ navigation }) {
    return ( 
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Inbox" component={ConnectionsScreen} />
            <Stack.Screen name="ChatDonors" component={ChatDonors} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    )
}