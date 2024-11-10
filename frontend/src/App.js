import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import PaymentsPortal from './components/PaymentsPortal';
import AccountDetails from './components/AccountDetails';
import WelcomeScreen from './components/WelcomeScreen';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeMain from './components/EmployeeMain';
import EmployeeRegister from './components/EmployeeRegister';
import PaymentsDisplay from './components/PaymentsDisplay';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen/>} />
        <Route path="/employeelogin" element={<EmployeeLogin/>} />
        <Route path="/employeemain" element={<EmployeeMain/>} />
        <Route path="/employeeregister" element={<EmployeeRegister/>} />
        <Route path="/paymentsdisplay" element={<PaymentsDisplay/>} />
        <Route path="login/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payments" element={<PaymentsPortal />} />
        <Route path="/account-details" element={<AccountDetails />} />
      </Routes>
    </Router>
  );
}

export default App;