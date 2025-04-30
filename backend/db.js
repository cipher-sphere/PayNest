import mongoose from 'mongoose';
import { MONGODB_URI } from './routes/config.js';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Account Schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create account automatically when user is created
userSchema.post('save', async function(doc) {
  try {
    console.log("Creating account for user:", doc._id);
    // Generate random balance between 900 and 1000
    const randomBalance = Math.floor(Math.random() * 101) + 900;
    
    // First check if account already exists
    const existingAccount = await Account.findOne({ userId: doc._id });
    if (existingAccount) {
      console.log("Account already exists for user:", doc._id);
      return;
    }
    
    const account = new Account({
      userId: doc._id,
      balance: randomBalance // Random balance between 900 and 1000
    });
    const savedAccount = await account.save();
    console.log("Account created successfully with balance:", savedAccount.balance);
  } catch (error) {
    console.error('Error creating account:', error);
  }
});

// Create models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

export { User, Account };