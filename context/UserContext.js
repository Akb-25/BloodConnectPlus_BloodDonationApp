import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export const UserProvider = ({ children, navigation }) => {
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const loadUserId = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        setUserId(storedId);
      }
    };
    loadUserId();
  }, []);

  const saveUserId = async (id) => {
    await AsyncStorage.setItem("userId", id);
    setUserId(id);
    console.log("User ID saved:", id);
    navigation.replace("HomeScreen");
  };

  const clearUserId = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
    // navigation.replace("LoginScreen");
  };

  return (
    <UserContext.Provider value={{ userId, saveUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};