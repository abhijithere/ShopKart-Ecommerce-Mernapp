import { asyncerror } from '../middleware/catchAsyncError.js';
import Stripe from 'stripe'

// (process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")
const stripe = new Stripe('sk_test_51NtkWQSGLsLtkSsKC9Rr7IbhKGTuZYGEF5SI7KSEOmBzTQPol6wmzPyFhkO33SEK0FcvcshbGWmJJttbfNZJN4VD006njFN3gB');



export const processPayment = asyncerror(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = asyncerror(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY});
});