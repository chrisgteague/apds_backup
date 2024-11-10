import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeMain() {
  const navigate = useNavigate();
  
  const handleRegCustomer = () => {
    navigate('/register');
  };
  
  const handleRegEmployee = () => {
    navigate('/employeeregister');
  };
  
  const handleViewClientPayments = () => {
    navigate('/paymentsdisplay');
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to the Employee Main Page</h2>
      <div style={styles.boxContainer}>
        <div style={styles.box}>
          <h3>Register a Customer</h3>
          <button style={styles.button} onClick={handleRegCustomer}>
            Register Customer
          </button>
        </div>
        <div style={styles.box}>
          <h3>Register an Employee</h3>
          <button style={styles.button} onClick={handleRegEmployee}>
            Register Employee
          </button>
        </div>
        <div style={styles.box}>
          <h3>View Client Payments</h3>
          <button style={styles.button} onClick={handleViewClientPayments}>
            View Payments
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  box: {
    width: '200px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EmployeeMain;