import React, { useState, useEffect } from 'react';

function PaymentsDisplay() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    const fetchPayments = async () => {
      try {
        const response = await fetch('https://localhost/auth/customerdetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,  // Send the token as Bearer token
          },
        });

        if (!response.ok) {
          throw new Error('Authorization failed. Please check your token.');
        }

        const data = await response.json();
        if (data.success && data.customers) {
          setPayments(data.customers); // Update state with customer data
        } else {
          setError('Error fetching customer data');
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchPayments();
  }, []);

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If there are no payments, show a message
  if (!payments.length) {
    return <div>No payments found.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Customer Payments</h2>
      <div style={styles.tableWrapper}>
        <div style={styles.table}>
          {/* Column Headers */}
          <div style={styles.row}>
            <div style={styles.columnHeader}>Username</div>
            <div style={styles.columnHeader}>Account Number</div>
            <div style={styles.columnHeader}>Amount</div>
            <div style={styles.columnHeader}>Currency</div>
            <div style={styles.columnHeader}>Provider</div>
            <div style={styles.columnHeader}>Created At</div>
            <div style={styles.columnHeader}>Status</div>
          </div>
          {/* Data Rows */}
          {payments.map((payment, index) => (
            <div
              key={index}
              style={index % 2 === 0 ? styles.row : styles.rowAlternate}
            >
              <div style={styles.cell}>{payment.userName}</div>
              <div style={styles.cell}>{payment.accountNumber}</div>
              <div style={styles.cell}>{payment.amount}</div>
              <div style={styles.cell}>{payment.currency}</div>
              <div style={styles.cell}>{payment.provider}</div>
              <div style={styles.cell}>
                {new Date(payment.createdAt).toLocaleDateString('en-US')}
              </div>
              <div style={styles.cell}>{payment.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // 7 columns for each entry
    gap: '0px',
    borderCollapse: 'collapse',
  },
  row: {
    display: 'contents',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  },
  rowAlternate: {
    display: 'contents',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#e0e0e0',
  },
  columnHeader: {
    padding: '10px',
    backgroundColor: '#2C3E50',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  cell: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
};

export default PaymentsDisplay;
