import React, { useState, useEffect, createContext, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "../config/supabase";
import PersonProfileNavigator from "./PersonProfileNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

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
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="RequestNavigator" component={RequestNavigator} />
            <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} />
            <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            {/* <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} /> */}
            {/* <Stack.Screen name="RequestNavigator" component={RequestNavigator} /> */}
            {/* <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} /> */}
            {/* <Stack.Screen name="ChatNavigator" component={ChatNavigator} /> */}
        </Stack.Navigator>
    );
};


function AppNavigator() {
  // const { user, setUser } = useContext(AuthenticatedUserContext);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     setUser(session?.user ?? null);
  //     setLoading(false);
  //   };

  //   getSession();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

    return (
        <NavigationContainer>
            {/* {user ? <AppStack /> : <AuthStack />} */}
            <AppStack/>
        </NavigationContainer>
    );
}

export default function App() {
  return (
    // <AuthenticatedUserProvider>
      <AppNavigator />
    // </AuthenticatedUserProvider>
  );
}

const COLORS = {
  ORANGE: '#FFA500',
  BLACK: '#000000',
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: '8%', 
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        paddingBottom: 7,
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: COLORS.ORANGE,
      tabBarInactiveTintColor: COLORS.BLACK,
    }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source= {require("../material/home.png")}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.ORANGE : COLORS.BLACK,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.ORANGE,
          tabBarInactiveTintColor: COLORS.BLACK,
        }}
      />
      <Tab.Screen
        name="FindDonor"
        component={RequestNavigator}
        options={{
          title: 'FindDonor',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require("../material/search.png")} 
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.ORANGE : COLORS.BLACK,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.ORANGE,
          tabBarInactiveTintColor: COLORS.BLACK,
        }}
      />
      <Tab.Screen
        name="Requests"
        component={ChatNavigator}
        options={{
          title: 'Requests',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require("../material/message.png")}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.ORANGE : COLORS.BLACK,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.ORANGE,
          tabBarInactiveTintColor: COLORS.BLACK,
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={PersonProfileNavigator}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require("../material/user.png")}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.ORANGE : COLORS.BLACK,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.ORANGE,
          tabBarInactiveTintColor: COLORS.BLACK,
        }}
      />
    </Tab.Navigator>
  );
};