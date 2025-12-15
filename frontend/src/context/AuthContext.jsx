import { useState, useEffect, createContext, useContext } from "react";
import { registerUser, loginUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const register = async (email, password) => {
    await registerUser(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
