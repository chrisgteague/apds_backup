import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentsPortal() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ZAR'); // Default currency to rands
  const [provider, setProvider] = useState('SWIFT'); // Only provider available
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key used
  
    try {
      const response = await fetch('https://localhost/auth/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          amount, // Your form data
          currency,
          provider,
        }),
      });
  
      const data = await response.json();
      console.log('Response from server:', data); // log server response
      
      if (response.ok) {
        navigate('/account-details');
      } else {
        // Handle error
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting account details:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // go back to the login page
  };


  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Payment Portal</h2>
        <form onSubmit={handlePayment} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount:</label>
            <div style={styles.amountContainer}>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={styles.selectCurrency}
              >
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies as needed */}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={styles.inputAmount}
                min="0" // Prevent negative amounts
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Provider:</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              style={styles.select}
              disabled
            >
              <option value="SWIFT">SWIFT</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Make Payment</button>
        </form>
        <button onClick={handleLogout} style={styles.tempButton}>Logout</button> {/* Logout button */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  box: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '300px', // Set a specific width for the box
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
  },
  amountContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  selectCurrency: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px', // Spacing between currency and amount
    flex: '0 0 80px', // Fixed width for the currency select
  },
  inputAmount: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tempButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f44336', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px', 
  },
};

export default PaymentsPortal;