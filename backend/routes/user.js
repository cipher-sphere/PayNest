import express from 'express';
import { authMiddleware } from './middleware.js';
import { User } from '../db.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
import { Account } from '../db.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }
        
        const user = new User({
            username,
            password,
            firstName,
            lastName
        });
        const savedUser = await user.save();
        
        // Explicitly create an account 
        const randomBalance = Math.floor(Math.random() * 101) + 900;
        const account = new Account({
            userId: savedUser._id,
            balance: randomBalance
        });
        await account.save();
        console.log("Account created with balance:", randomBalance);
        
        const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
        
        res.json({
            message: "User created successfully",
            token,
            userId: savedUser._id,
            balance: randomBalance
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        
        // Check if user has an account, if not create one
        let account = await Account.findOne({ userId: user._id });
        if (!account) {
            const randomBalance = Math.floor(Math.random() * 101) + 900;
            account = new Account({
                userId: user._id,
                balance: randomBalance
            });
            await account.save();
            console.log("Account created on signin with balance:", randomBalance);
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.json({
            token,
            userId: user._id,
            balance: account.balance
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Error signing in",
            error: error.message
        });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user details",
            error: error.message
        });
    }
});

// Create account for existing users
router.post("/create-account", authMiddleware, async (req, res) => {
    try {
        // Check if account already exists
        let account = await Account.findOne({ userId: req.userId });
        
        if (account) {
            return res.json({
                message: "Account already exists",
                balance: account.balance
            });
        }
        
        // Create new account with random balance
        const randomBalance = Math.floor(Math.random() * 101) + 900;
        account = new Account({
            userId: req.userId,
            balance: randomBalance
        });
        await account.save();
        
        res.json({
            message: "Account created successfully",
            balance: randomBalance
        });
    } catch (error) {
        console.error("Account creation error:", error);
        res.status(500).json({
            message: "Error creating account",
            error: error.message
        });
    }
});

export default router;