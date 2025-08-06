// src/context/authContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const handlelogin = (data) =>{
      const storedUser = JSON.parse(localStorage.getItem('token'));
      console.log(storedUser);
      if (storedUser) {
        setUser(storedUser);
      }
  }

  useEffect(() => {
    try {
      // Fetch from localStorage/token/API
      const storedUser = JSON.parse(localStorage.getItem('token'));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      // Clear invalid data
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false); // Set loading to false after checking
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      setUser, 
      isLoading,
      handlelogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;