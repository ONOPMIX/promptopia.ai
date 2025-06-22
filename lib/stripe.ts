import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Using default API version
} as any);
