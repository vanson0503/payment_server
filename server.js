require('dotenv').config();
const express = require('express');
const stripe = require('stripe')("sk_test_51PBIYF08bUcYa2HA2w3H7kT5ylRz3BiyzA2lhazM6a20YibswW1OZDBvBDGCCKhFZeea1iGUZRbEx6KHIU9SUqsD00KkmGmYE6");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // Amount is expected to be in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
