import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setUserDetails({
        username: currentUser.username || '',
        email: currentUser.email || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phone: currentUser.phone || ''
      });
      setLoading(false);
      
      // Fetch user's booking history
      fetchBookings();
    }
  }, [currentUser]);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      // In a real app, you would fetch bookings from your API
      // const response = await axios.get(`/api/users/${currentUser.id}/bookings`);
      // setBookings(response.data);
      
      // For demo purposes, we'll use mock data from localStorage or create some if none exists
      const savedBookings = localStorage.getItem('userBookings');
      
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        // If no bookings in localStorage, use empty array
        setBookings([]);
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would call your backend API to update user details
      // await axios.put(`/api/users/${currentUser.id}`, userDetails);
      
      // For demo purposes, we'll just update the local storage
      const updatedUser = { ...currentUser, ...userDetails };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // In a real app, you would call your backend API
        // await axios.delete(`/api/bookings/${bookingId}`);
        
        // For demo purposes, we'll just update the localStorage
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        setBookings(updatedBookings);
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
        
        alert('Booking cancelled successfully!');
      } catch (error) {
        console.error('Failed to cancel booking', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      <div className="profile-content">
        {!editMode ? (
          <div className="profile-details">
            <div className="detail-row">
              <span>Username:</span>
              <span>{userDetails.username}</span>
            </div>
            <div className="detail-row">
              <span>Email:</span>
              <span>{userDetails.email}</span>
            </div>
            <div className="detail-row">
              <span>First Name:</span>
              <span>{userDetails.firstName || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span>Last Name:</span>
              <span>{userDetails.lastName || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span>Phone:</span>
              <span>{userDetails.phone || 'Not provided'}</span>
            </div>
            <button 
              onClick={() => setEditMode(true)}
              className="edit-button"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="save-button"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

        <div className="booking-history">
          <h3>Booking History</h3>
          
          {bookingsLoading ? (
            <div className="loading">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">
              <p>You haven't made any bookings yet.</p>
              <p>Start your journey by booking a ticket!</p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h4>
                      <FaTicketAlt /> Booking #{booking.id}
                    </h4>
                    <span className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p><FaBus /> {booking.busOperator} - {booking.busNumber}</p>
                    <p><FaCalendarAlt /> {formatDate(booking.travelDate)}</p>
                    <p>
                      <FaMapMarkerAlt /> {booking.source} to {booking.destination}
                    </p>
                    <p>Departure: {booking.departureTime}</p>
                    <p>Arrival: {booking.arrivalTime}</p>
                    <p>Seat(s): {booking.seats.join(', ')}</p>
                    <p>Amount Paid: ₹{booking.amount}</p>
                  </div>
                  
                  <div className="booking-actions">
                    {booking.status === 'CONFIRMED' && (
                      <button 
                        onClick={() => cancelBooking(booking.id)}
                        className="cancel-booking-button"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button className="view-ticket-button">
                      View Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;