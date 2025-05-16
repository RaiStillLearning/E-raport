import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface UserContextType {
  userRole: string;
  setUserRole: (role: string) => void;
  fetchUserRole: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  userRole: "guest",
  setUserRole: () => {},
  fetchUserRole: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<string>("guest");

  // Fungsi untuk fetch role dari backend
  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserRole("guest");
        return;
      }

      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.role) {
        setUserRole(response.data.role);
        localStorage.setItem("userRole", response.data.role);
      } else {
        setUserRole("guest");
      }
    } catch (error) {
      console.error("Gagal fetch user role:", error);
      setUserRole("guest");
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole, fetchUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
