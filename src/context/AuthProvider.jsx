import { useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const API_URL =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const setAuthHeader = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
      });
      storeToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setAuthHeader();
    } catch (error) {
      setError(error.response.data.message || "Error signing up");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      storeToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setAuthHeader();
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      removeToken();
      setAuthHeader();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      setError("Error logging out");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    setAuthHeader();
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        error,
        isLoading,
        isCheckingAuth,
        signup,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
