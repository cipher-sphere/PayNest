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
        
        // Save password as plain text
        const user = new User({
            username,
            password,  // storing password as plain text
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

// router.post("/signin", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({
//         message: "User not found. Please sign up first.",
//       });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({
//         message: "Invalid username or password",
//       });
//     }

//     // Only check for account if signin is successful
//     let account = await Account.findOne({ userId: user._id });
//     if (!account) {
//       return res.status(403).json({
//         message: "Account not found. Please sign up first.",
//       });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET);

//     res.json({
//       token,
//       userId: user._id,
//       balance: account.balance,
//     });
//   } catch (error) {
//     console.error("Signin error:", error);
//     res.status(500).json({
//       message: "Error signing in",
//       error: error.message,
//     });
//   }
// });
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          message: "User not found. Please sign up first.",
        });
      }
  
      if (user.password !== password) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }
  
      // Only check for account if signin is successful
      let account = await Account.findOne({ userId: user._id });
      if (!account) {
        return res.status(403).json({
          message: "Account not found. Please sign up first.",
        });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  
      res.json({
        token,
        userId: user._id,
        balance: account.balance,
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({
        message: "Error signing in",
        error: error.message,
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
router.get("/bulk", authMiddleware, async (req, res) => {
  try {
      // Find all users except the current user and exclude password field
      const users = await User.find({ _id: { $ne: req.userId } }).select("-password");
      
      res.json({
          users
      });
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
          message: "Error fetching users",
          error: error.message
      });
  }
});

// Add endpoint to get a specific user by ID
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.params.userId).select("-password");
      if (!user) {
          return res.status(404).json({
              message: "User not found"
          });
      }
      
      res.json({
          user
      });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({
          message: "Error fetching user details",
          error: error.message
      });
  }
});
export default router;