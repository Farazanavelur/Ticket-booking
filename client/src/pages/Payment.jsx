import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);
  setError('');

  // Validate card details if card is selected
  if (paymentMethod === 'card') {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError('Please fill all card details');
      setIsProcessing(false);
      return;
    }
  }

  try {
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const transactionId = `TXN${Math.floor(Math.random() * 1000000)}`;
    const paymentInfo = {
      bookingDetails,
      paymentDetails: {
        method: paymentMethod,
        amount: bookingDetails.totalAmount,
        transactionId,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    };

    // Save to localStorage
    const existingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    localStorage.setItem('bookingHistory', JSON.stringify([paymentInfo, ...existingHistory]));

    // Navigate to ticket page
    navigate('/ticket', { state: paymentInfo });
  } catch (err) {
    console.error(err);
    setError('Payment failed. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};


  if (!bookingDetails) {
    return null;
  }

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      
      <div className="payment-summary">
        <h3>Booking Summary</h3>
        {bookingDetails.searchParams.type === 'flight' && (
          <div>
            <p><strong>Flight:</strong> {bookingDetails.item.airline} ({bookingDetails.item.flightNumber})</p>
            <p><strong>Class:</strong> {bookingDetails.searchParams.classType}</p>
          </div>
        )}
        {bookingDetails.searchParams.type === 'train' && (
          <p><strong>Train:</strong> {bookingDetails.item.name} ({bookingDetails.item.number})</p>
        )}
        {bookingDetails.searchParams.type === 'bus' && (
          <p><strong>Bus:</strong> {bookingDetails.item.operator} ({bookingDetails.item.busNumber})</p>
        )}
        <p><strong>Passengers:</strong> {bookingDetails.passengers.length}</p>
        <p><strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}</p>
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="payment-methods">
          <h3>Payment Method</h3>
          <div className="method-options">
            <label className={paymentMethod === 'card' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Credit/Debit Card
            </label>
            <label className={paymentMethod === 'upi' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              UPI
            </label>
            <label className={paymentMethod === 'netbanking' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
              />
              Net Banking
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="card-details">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="upi-details">
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="netbanking-details">
            <div className="form-group">
              <label>Select Bank</label>
              <select>
                <option value="">Select your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          </div>
        )}

        {error && <div className="payment-error">{error}</div>}

        <button 
          type="submit" 
          className="pay-now-button"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${bookingDetails.totalAmount}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;