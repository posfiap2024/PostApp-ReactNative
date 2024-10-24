import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logarUsuario, obterUsuario } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem('token', token);
    } else {
      AsyncStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username, password) => {
    const _token = await logarUsuario(username, password);
    if (_token) {
      const decodedUser = await obterUsuario(_token);
      setToken(_token);
      setUser(decodedUser);
    }
    console.log("Auth Context token: ", token);
    console.log("Auth Context _token: ", _token);
    return token;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
