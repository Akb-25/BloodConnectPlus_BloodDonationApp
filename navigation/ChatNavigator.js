import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatDonors  from "../screens/Contact/ChatWithDonors";
import ChatScreen  from "../screens/Contact/ChatScreen";
import ConnectionsScreen from "../screens/Contact/ConnectionsScreen";
import ChatScreen2 from "../screens/Contact/ChatScreen2";
const Stack = createStackNavigator();

export default function ChatNavigator({ navigation }) {
    return ( 
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Inbox" component={ConnectionsScreen} />
            <Stack.Screen name="ChatDonors" component={ChatDonors} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatScreen2" component={ChatScreen2} />
        </Stack.Navigator>
    )
}