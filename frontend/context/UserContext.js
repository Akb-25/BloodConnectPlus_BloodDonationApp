import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  
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
  };

  const clearUserId = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: saveUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};

