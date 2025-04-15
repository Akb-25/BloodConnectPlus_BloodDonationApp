import React, { useState, useEffect, createContext, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "../config/supabase";

// Screens
import IntroScreen from "../screens/IntroScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

// Navigators
import ProfileNavigator from "./ProfileNavigator";
import RequestNavigator from "./RequestNavigator";
import EligibilityNavigator from "./EligibilityNavigator";
import ChatNavigator from "./ChatNavigator";

// Context
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
            <Stack.Screen name="RequestNavigator" component={RequestNavigator} />
            <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} />
            <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
        </Stack.Navigator>
    );
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Stack.Screen name="RequestNavigator" component={RequestNavigator} />
      <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} />
      <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
    </Stack.Navigator>
  );
}


function AppNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
            <AppStack/>
        </NavigationContainer>
    );
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <AppNavigator />
    </AuthenticatedUserProvider>
  );
}