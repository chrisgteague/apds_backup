const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import User model
const ExpressBrute = require('express-brute');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/token-auth');


//express brute set up for brute force attacks
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store);

//this is the regex patterns for validation in the routes
const userNamePattern = /^[a-zA-Z0-9._-]{3,20}$/; // Username must be 3-20 characters long
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; // At least 5 chars, 1 letter, 1 number
const idNumberPattern = /^\d{8,}$/; // ID Number must be at least 8 digits

// login route
router.post('/login', bruteForce.prevent, async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (!userNamePattern.test(userName) || !passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Invalid username or password format.' });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the user's role and add it to the token payload
    const token = jwt.sign({ id: user._id, userName: user.userName, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Log the user's role before sending the response
console.log(`User role for ${user.userName}: ${user.role}`);

// Return the role in the response
return res.status(200).json({ status: 'success', token, role: user.role });


  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// register route
router.post('/register', bruteForce.prevent, async (req, res) => {
  const { fullName, userName, idNumber, accountNumber, password, role } = req.body;

  if (!fullName || !userName || !idNumber || !accountNumber || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!['employee', 'customer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Role must be either employee or customer.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ idNumber }, { accountNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this ID number or account number.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      userName,
      idNumber,
      accountNumber,
      password: hashedPassword,
      role, // Include role when saving the user
    });

    await newUser.save();

    return res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Endpoint to handle the payment amount
router.post('/payment', verifyToken, async (req, res) => {
  try {
    const { amount, currency, provider } = req.body;

    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.user.id.toString()); // Convert to string

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user with the payment details, setting status to "pending"
    user.paymentPortal = {
      amount,
      currency,
      provider,
      status: "pending", // status set to pending
    };

    await user.save();
    res.json({ success: true, message: 'Payment details updated successfully' });
  } catch (error) {
    console.error('Error updating payment details:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error while updating payment details' });
  }
});


// Endpoint to handle the account details
router.post('/account-details', verifyToken, async (req, res) => {
  

  try {
    const { accountHolderName, bank, bankAccountNumber, swiftCode } = req.body;

    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.user.id.toString()); // Convert to string

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user with the bank details
    user.accountDetails = {
      accountHolderName, // The account holder's name
      bank,              // The name of the bank
      bankAccountNumber,     // The account number
      swiftCode,        // The SWIFT code
    };

    await user.save();
    res.json({ success: true, message: 'Account details updated successfully' });
  } catch (error) {
    console.error('Error updating account details:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error while updating account details' });
  }
});

// GET request to retrieve specific fields for customers
router.get('/customerdetails', verifyToken, async (req, res) => {
  try {
    // Find users with role 'customer' and select specified fields, including 'amount'
    const customers = await User.find(
      { role: 'customer' },
      'userName accountNumber createdAt paymentPortal.amount paymentPortal.provider paymentPortal.currency paymentPortal.status'
    );

    console.log('Customers:', customers);  // Log the customer data to verify structure

    if (!Array.isArray(customers)) {
      return res.status(500).json({ success: false, message: 'Expected array of customers' });
    }

    // Map through customers to create a response array with only the required fields
    const customerData = customers.map(customer => ({
      userName: customer.userName,
      accountNumber: customer.accountNumber,
      createdAt: customer.createdAt,
      amount: customer.paymentPortal?.amount || null, // Safely handle undefined/nullable values
      provider: customer.paymentPortal?.provider || null,
      currency: customer.paymentPortal?.currency || null,
      status: customer.paymentPortal?.status || null
    }));

    res.status(200).json({ success: true, customers: customerData });
  } catch (error) {
    console.error('Error retrieving customer data:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error while retrieving customer data' });
  }
});






module.exports = router;



