import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  // Simulate checking authentication state on initial load
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const localLogin = (token) => {
    sessionStorage.setItem("authToken", token);
    setIsAuth(true);
  };

  const localLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, localLogin, localLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
