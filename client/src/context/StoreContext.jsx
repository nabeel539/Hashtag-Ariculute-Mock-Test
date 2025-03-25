// export default StoreContextProvider;
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const backendUrl = "http://localhost:2022";

  // Enhanced state to include token, role and authentication status
  const [authState, setAuthState] = useState({
    token: "",
    role: "",
    isAuthenticated: false,
  });

  // Load authentication data from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setAuthState({
        token: storedToken,
        role: storedRole || "",
        isAuthenticated: true,
      });
    }
  }, []);

  // Login function to update auth state and localStorage
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setAuthState({
      token,
      role,
      isAuthenticated: true,
    });
  };

  // Logout function to clear auth state and localStorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuthState({
      token: "",
      role: "",
      isAuthenticated: false,
    });
  };

  const contextvalue = {
    backendUrl,
    authState,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
