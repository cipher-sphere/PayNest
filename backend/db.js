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

// Create models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

export { User, Account };