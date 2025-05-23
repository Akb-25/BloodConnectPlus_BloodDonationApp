import React, { useState, useEffect, createContext, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from "react-native";
import { supabase } from "../config/supabase";
import { Image } from 'react-native';
import Header from "../components/Header";

// Screens
// import IntroScreen from "../screens/IntroScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import HomeScreen from "../screens/Main/HomeScreen";

// Navigators
import ProfileNavigator from "./ProfileNavigator";
import RequestNavigator from "./RequestNavigator";
import EligibilityNavigator from "./EligibilityNavigator";
import ChatNavigator from "./ChatNavigator";
import PersonProfileNavigator from "./PersonProfileNavigator";

//Screens
import ChatDonors from "../screens/Contact/ChatWithDonors";
import ChatScreen from "../screens/Contact/ChatScreen";
import DonorDetails from "../screens/PersonProfile/DonorDetails";
import ScheduledDonation from "../screens/Main/ScheduledDonation";
import ProfileStep1 from "../screens/Profile/ProfileStep1";
import ProfileStep2 from "../screens/Profile/ProfileStep2";
import ProfileStep3 from "../screens/Profile/ProfileStep3";
import ProfileView from "../screens/Profile/ProfileView";

// Context
import { AuthenticatedUserContext, AuthenticatedUserProvider } from '../context/AuthenticatedUserContext'; // adjust path if needed


// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [firstLogin, setFirstLogin] = useState(false);
//   // const [firstLogin, setFirstLogin] = useState(false);
//   return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser, firstLogin, setFirstLogin }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

const Stack = createStackNavigator();

function AuthStack() {
  const {firstLogin} = useContext(AuthenticatedUserContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} /> */}
    </Stack.Navigator>
  );
}

function AppStack() { 
    const { firstLogin } = useContext(AuthenticatedUserContext);  
    return (
           

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
            {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            {/* <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} /> */}
            {/* <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />  */}
            {/* <Stack.Screen name="Tab" component={TabNvaigator} /> */}
            {/* <Stack.Screen name="ProfileStep1" component={ProfileStep1} options={{ header: () => <Header title="Profile Step 1" /> }} />
            <Stack.Screen name="ProfileStep2" component={ProfileStep2} options={{ header: () => <Header title="Profile Step 2" /> }} />
            <Stack.Screen name="ProfileStep3" component={ProfileStep3} options={{ header: () => <Header title="Profile Step 3" /> }} />
            <Stack.Screen name="ProfileView" component={ProfileView} options={{ header: () => <Header title="Profile View" /> }} /> */}
            {/* <Stack.Screen name="Home" component={TabNavigator} /> */}
            
            {firstLogin && (
              <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
            ) } 
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="RequestNavigator" component={RequestNavigator} />
            <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} />
            <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatDonors" component={ChatDonors} />
            <Stack.Screen name="DonorDetails" component={DonorDetails} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ScheduledDonation" component={ScheduledDonation} />
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            {/* <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} /> */}
            {/* <Stack.Screen name="RequestNavigator" component={RequestNavigator} /> */}
            {/* <Stack.Screen name="EligibilityNavigator" component={EligibilityNavigator} /> */}
            {/* <Stack.Screen name="ChatNavigator" component={ChatNavigator} /> */}
        </Stack.Navigator>
    );
};


function AppNavigator() {
  const { user, setUser, firstLogin } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  // const firstLogin, setFirstLogin] = useContext(AuthenticatedUserContext);
  useEffect(() => {
    const getSession = async () => {
      await supabase.auth.signOut();
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
            {/* <AppStack/> */}
        </NavigationContainer>
    );
}
    
  //   return (
  //   <NavigationContainer>
      
  //     {user ? (
  //       firstLogin ? (
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
  //         </Stack.Navigator>
  //       ) : (
  //         <AppStack />
  //       )
  //     ) : (
  //       <AuthStack />
  //     )}
  //   </NavigationContainer>
  // );
// }

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <AppNavigator />
    </AuthenticatedUserProvider>
  );
}

const COLORS = {
  ORANGE: '#D81D35',
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

export { AppNavigator, TabNavigator };