import { useState, useEffect, createContext, useContext } from "react";
import { registerUser, loginUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // 1️⃣ Hydrate token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setAuthReady(true); // no token → auth resolved
    }
  }, []);

  // 2️⃣ Validate token with backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // token invalid / expired
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      } finally {
        setAuthReady(true); // ✅ auth resolved ONLY after backend check
      }
    };

    fetchUser();
  }, [token]);

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
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuth: !!user, // 👈 IMPORTANT
        authReady,
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
