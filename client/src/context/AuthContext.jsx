import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SomeComponent() {
  let navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
    />
  );
}

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password, firstName, lastName, phone) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName,
      phone
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    
    // Decode token to get user info (in a real app, you might want to verify the token)
    const user = {
      id: response.data.id || 'demo-user-id',
      username,
      email,
      firstName,
      lastName,
      phone
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    
    // For demo purposes, we'll set a mock user
    const user = {
      id: 'demo-user-id',
      username: email.split('@')[0],
      email,
      firstName: 'Demo',
      lastName: 'User'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return response.data;
  };

  const logout = () => {
    // In a real app, you might want to call your backend logout endpoint
    // await axios.post('http://localhost:5000/api/auth/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}