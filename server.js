const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Chatbot logic
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    
    // Dummy response based on keywords
    let responseMessage = '';
    if (userMessage.includes('balance')) {
        responseMessage = 'You can access your balance on the dashboard.';
    } else if (userMessage.includes('savings')) {
        responseMessage = 'Our system helps you track and manage your savings goals efficiently. Would you like guidance on how to set or achieve your savings goals? If so, check out our AI report generator.';
    } else if (userMessage.includes('loan')) {
        responseMessage = 'Our system can help you manage loan management, loan advices, etc.';
    } else if (userMessage.includes('recent transactions')) {
        responseMessage = 'You can review recent transactions and get a detailed breakdown of expenses in your transaction history section.';
    } else if (userMessage.includes('budget')) {
        responseMessage = 'We offer tools to create and manage monthly budgets tailored to your financial goals. Would you like assistance in setting up or adjusting your budget? Use AI report generator.';
    } else if (userMessage.includes('investment')) {
        responseMessage = 'We provide insights and recommendations on various investment options to suit your financial profile. For insights, check out our AI report generator.';
    } else if (userMessage.includes('expenses')) {
        responseMessage = 'You can easily track and categorize your expenses to stay on top of your spending. For any further queries, contact 9876543210.';
    } else if (userMessage.includes('financial advice')) {
        responseMessage = 'Our system offers personalized financial advice to help you meet your financial goals. Use our AI report generator for the same.';
    } else if (userMessage.includes('support')) {
        responseMessage = 'Our customer support team is available to assist you with any issues related to your account or our services. Would you like to connect with a support representative? Contact 9876543210.';
    } else if (userMessage.includes('report')) {
        responseMessage = 'We provide AI report to generate a monthly record and advices based on the same.';
    } else {
        responseMessage = 'I didn\'t understand that. Can you please rephrase?';
    }

    res.json({ response: responseMessage });
});

// Serve the HTML form for testing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the form
});

app.listen(port, () => {
    console.log(`Chatbot listening at http://localhost:${port}`);
});
