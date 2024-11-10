import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    const handleCustomerClick = () => {
        navigate('/login'); // Navigate to the login page
    };
    const handleEmployeeClick = () => {
        navigate('/employeelogin'); //nav to employeelogin
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Our Application!</h1>
            <p>Some Shitty text for a welcome screen</p>
            
            <div style={styles.boxContainer}>
                {/* Customer Box */}
                <div style={styles.box}>
                    <h2>Customer? Click here</h2>
                    <button style={styles.button} onClick={handleCustomerClick}>
                        Get Started
                    </button>
                </div>

                {/* Employee Box */}
                <div style={styles.box}>
                    <h2>Employee? Click here</h2>
                    <button style={styles.button} onClick={handleEmployeeClick}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        color: '#333',
    },
    boxContainer: {
        display: 'flex',
        gap: '20px',
        marginTop: '30px',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '200px',
        height: '150px',
        backgroundColor: '#ffffff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
    }
};

export default WelcomeScreen;
