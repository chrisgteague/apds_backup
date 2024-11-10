import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeLogin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // The regex patterns
  const userNamePattern = /^[a-zA-Z0-9._-]+$/; 
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!userNamePattern.test(userName)) {
      alert('Invalid username. Only alphanumeric characters, dots, underscores, and dashes are allowed.');
      return;
    }
    
    if (!passwordPattern.test(password)) {
      alert('Invalid password. It must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }
  
    try {
      const response = await fetch('https://localhost/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        // Store token first
        localStorage.setItem('token', data.token);
  
        // Now navigate based on the role
        if (data.role === 'employee') {
          navigate('/employeemain');  // Navigate to Employee Main page
        } else if (data.role === 'customer') {
            // add no customer login
        }
      } else {
        console.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Employee Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.link}>
          Not an employee? <Link to="/login" style={styles.linkText}>Go to Customer Login</Link>
        </p>
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
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
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
  input: {
    width: 'calc(100% - 20px)',
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
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  link: {
    marginTop: '20px',
  },
  linkText: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default EmployeeLogin;