// Report.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Report = ({ username }) => {
  const [report, setReport] = useState(null);
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/report/${username}`);
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [username]);

  if (!report) return <div>Loading...</div>;

  // Data for the chart
  const chartData = {
    labels: ['Savings', 'Expenses', 'Income'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [report.totalSavings, report.totalExpenses, report.totalIncome],
        backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Financial Report for {username}</h1>
      <h2>Short Term Goal: {report.shortTermGoal}</h2>
      <h2>Long Term Goal: {report.longTermGoal}</h2>
      <h3>Savings Recommendation: Save ₹{report.savingsRecommendation}</h3>
      <h3>Investment Plan: {report.investmentPlan.shortTerm} | {report.investmentPlan.longTerm}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default Report;
