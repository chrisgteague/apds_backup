import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountDetails() {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bank, setBank] = useState('ABSA');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regex for swift code: 8 to 11 uppercase letters
    const swiftCodeRegex = /^\d{8,11}$/;

    // Regex for account holder name: allows names with titles like Mr. or Ms. and spaces
    const accountHolderNameRegex = /^(Mr\.?|Ms\.?|Mrs\.?|Dr\.?|Prof\.?)\s?([A-Za-z]+(?:\s[A-Za-z]+)*)$/;

    // Regex for bank account number
    const bankAccountNumberRegex = /^\d{10,}$/; 

    // Validate account holder name
    if (!accountHolderNameRegex.test(accountHolderName)) {
      alert('Please enter a valid account holder name');
      return;
    }
    

    if (!bankAccountNumberRegex.test(bankAccountNumber)) {
      console.error('Invalid bank account number. It must be 10 digits');
      return; 
    }

    // Validate swift code
    if (!swiftCodeRegex.test(swiftCode)) {
      alert('Please enter a valid SWIFT code (8 to 11 uppercase letters).');
      return;
    }

    const token = localStorage.getItem('token'); // Replace 'token' with the actual key used
  
    try {
      const response = await fetch('https://localhost/auth/account-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          accountHolderName, // Your form data
          bank,
          bankAccountNumber,
          swiftCode,
        }),
      });
  
      const data = await response.json();
      console.log('Response from server:', data); // Log the server response
      
      if (response.ok) {
        navigate('/payments');
      } else {
        // Handle error
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting account details:', error);
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Account Details</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Account Holder Name:</label>
            <input
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
          <label style={styles.label}>Bank:</label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                style={styles.input}
              >
                <option value="ABSA">ABSA</option>
                <option value="FNB">FNB (First National Bank)</option>
                <option value="Nedbank">Nedbank</option>
                <option value="Standard Bank">Standard Bank</option>
                <option value="Capitec">Capitec Bank</option>
                <option value="Investec">Investec</option>
                <option value="Bidvest Bank">Bidvest Bank</option>
                <option value="African Bank">African Bank</option>
                <option value="Bank of China">Bank of China</option>
                <option value="HSBC">HSBC South Africa</option>

              </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Account Number:</label>
            <input
              type="text"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>SWIFT Code:</label>
            <input
              type="text"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Pay Now</button>
        </form>
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
    padding: '30px', // Increased padding around the box
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
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    display: 'block', 
  },
  input: {
    padding: '10px', 
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%', 
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AccountDetails;
