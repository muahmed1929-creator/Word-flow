export const plans = {
  free: {
    id: 'free',
    name: 'Free',
    limit: 1000,
  },
  pro: {
    id: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    name: 'Pro',
    limit: 10000,
    price: 10,
  },
  business: {
    id: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID!,
    name: 'Business',
    limit: 100000,
    price: 18,
  },
};
