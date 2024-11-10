const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 role: { 
  type: String, 
  enum: ['employee', 'customer'], 
  required: true 
  },
    paymentPortal: {
      amount: {
        type: String,
        required: false,
      },
      currency: {
        type: String,
        required: false,
      },
      provider: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
    },
      accountDetails: {
        accountHolderName: {
          type: String,
          required: false,
        },
        bank: {
          type: String,
          required: false,
        },
        bankAccountNumber: {
          type: String,
          required: false,
        },
        swiftCode: {
          type: String,
          required: false,
        },
        
      },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
