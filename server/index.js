const express = require('express');
const bodyParser = require('body-parser');
const africastalking = require('africastalking')({
    apiKey: 'YOUR_API_KEY',
    username: 'YOUR_USERNAME',
});
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // Add your Firebase service account key here
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-database-url.firebaseio.com',
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Handle USSD Requests
app.post('/ussd', async (req, res) => {
    const { text, phoneNumber, sessionId } = req.body;

    // Split input into parts for menu navigation
    const input = text.split('*');

    let response = '';

    // USSD Menu Logic
    if (text === '') {
        // Initial Menu
        response = `CON Welcome to AI Financial Advisor
1. Chat with AI
2. View Budget
3. Voice Input`;
    } else if (input[0] === '1') {
        // Chat with AI Logic
        response = `CON Enter your query for the AI Advisor:`;
        if (input.length > 1) {
            const userQuery = input.slice(1).join(' ');

            // Example: Interact with Firebase for AI Chat
            const chatResponse = await getAIResponse(userQuery);
            response = `END AI Says: ${chatResponse}`;
        }
    } else if (input[0] === '2') {
        // Budget Tracker Logic
        const budget = await getUserBudget(phoneNumber);
        response = `END Your Budget:\nIncome: ${budget.income}\nExpenses: ${budget.expenses}\nSavings: ${budget.income - budget.expenses}`;
    } else if (input[0] === '3') {
        // Voice Input Placeholder
        response = `END Voice Input not supported on USSD. Please use the app.`;
    } else {
        response = `END Invalid option.`;
    }

    res.contentType('text/plain');
    res.send(response);
});

// Example Functions for Firebase Data
async function getAIResponse(userQuery) {
    // Placeholder for AI Chatbot Interaction
    return `I can't give financial advice via USSD yet. Use the app.`;
}

async function getUserBudget(phoneNumber) {
    // Fetch User's Budget from Firebase
    const userRef = admin.firestore().collection('users').doc(phoneNumber);
    const doc = await userRef.get();
    return doc.exists ? doc.data().budget || { income: 0, expenses: 0 } : { income: 0, expenses: 0 };
}

// Start the Server
app.listen(3000, () => console.log('Server running on port 3000'));
