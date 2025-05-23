import { createContext } from 'react';
import React, { useState } from 'react';
export const AuthenticatedUserContext = createContext({
  user: null,
  setUser: () => {},
  firstLogin: false,
  setFirstLogin: () => {},
});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firstLogin, setFirstLogin] = useState(false);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, firstLogin, setFirstLogin }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};