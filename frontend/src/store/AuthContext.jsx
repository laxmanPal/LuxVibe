import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ADD THIS

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch(`${API_URL}/user/details`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("User not authenticated");

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setUser(null); // not logged in
    } finally {
      setLoading(false); // SET loading to false after fetch finishes
    }
  };

  const login = async () => {
    await fetchUserInfo(); // fetch user details after successful login
  };

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );
};
