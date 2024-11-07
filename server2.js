// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/financeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define User schema
const userSchema = new mongoose.Schema({
  fullName: String,
  monthlySalary: Number,
  shortTermGoal: String,
  yearsToReachShortTermGoal: Number,
  longTermGoal: String,
  yearsToReachLongTermGoal: Number,
  loanTaken: Boolean,
  loanAmount: Number,
  username: String,
  password: String,
  expenses: [{ description: String, amount: Number }],
  savings: [{ description: String, amount: Number }],
});

// Create User model
const User = mongoose.model('User', userSchema);

// API endpoint to get user report
app.get('/api/report/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Calculate savings and expenses report
    const totalIncome = user.monthlySalary;
    const totalExpenses = user.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalSavings = user.savings.reduce((acc, saving) => acc + saving.amount, 0);
    
    const report = {
      totalIncome,
      totalExpenses,
      totalSavings,
      shortTermGoal: user.shortTermGoal,
      longTermGoal: user.longTermGoal,
      savingsRecommendation: calculateSavingsRecommendation(user),
      investmentPlan: createInvestmentPlan(user),
    };

    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send('Error fetching report');
  }
});

// Helper function to calculate savings recommendation
function calculateSavingsRecommendation(user) {
  // Suggest saving 20% of income as a basic recommendation
  return user.monthlySalary * 0.20;
}

// Helper function to create an investment plan
function createInvestmentPlan(user) {
  return {
    shortTerm: `Invest in a savings account for your goal of ${user.shortTermGoal}.`,
    longTerm: `Consider mutual funds for your long-term goal of ${user.longTermGoal}.`,
  };
}

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
