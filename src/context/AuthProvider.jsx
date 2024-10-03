import { useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
axios.defaults.withCredentials = true;
const API_URL = "https://dataplane-api.onrender.com/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        firstName,
        lastName,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
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
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
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
      await axios.post(`${API_URL}/logout`);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      setError("Error logging out");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
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
