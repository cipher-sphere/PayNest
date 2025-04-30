import express from 'express';
import { authMiddleware } from './middleware.js';
import { Account } from '../db.js';
import mongoose from 'mongoose';

const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        
        if (!account) {
            return res.status(404).json({
                message: "Account not found for this user",
                userId: req.userId
            });
        }
        
        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Balance fetch error:", error);
        res.status(500).json({
            message: "Error retrieving balance",
            error: error.message
        });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    
    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer failed",
            error: error.message
        });
    }
});

export default router;