import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import About from './pages/About';
import Ticket from './pages/Ticket';
import BookingHistory from './pages/BookingHistory';

import Navbar from './components/Navbar';
import './App.css';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/about" element={<About />} />

            <Route path="/history" element={
              <PrivateRoute><BookingHistory /></PrivateRoute>
            } />
            <Route path="/" element={
              <PrivateRoute><Home /></PrivateRoute>
            } />
            <Route path="/search" element={
              <PrivateRoute><SearchResults /></PrivateRoute>
            } />
            <Route path="/book" element={
              <PrivateRoute><Booking /></PrivateRoute>
            } />
            <Route path="/payment" element={
              <PrivateRoute><Payment /></PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute><Profile /></PrivateRoute>
            } />
            <Route path="/ticket" element={
              <PrivateRoute><Ticket /></PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
