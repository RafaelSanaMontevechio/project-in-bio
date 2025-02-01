import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default stripe;
