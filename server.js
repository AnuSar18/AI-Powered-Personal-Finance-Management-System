const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hisaab', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    loanAmount: Number,
    longTermGoal: { amount: Number, years: Number },
    shortTermGoal: { amount: Number, years: Number },
    expenses: [String],
});

const User = mongoose.model('User', userSchema);

// Fetch user data
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add expense
app.post('/api/user/:id/expense', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.expenses.push(req.body.expense);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
