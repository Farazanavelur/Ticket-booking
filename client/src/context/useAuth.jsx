// useAuth.js
import { useContext } from 'react';
import AuthContext from './AuthContext'; // Adjust the import path accordingly

export const useAuth = () => useContext(AuthContext);
