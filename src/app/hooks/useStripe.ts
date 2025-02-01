import { useEffect, useState } from 'react';
import { Stripe, loadStripe } from '@stripe/stripe-js';

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadingStripeAsync() {
      const stripeInStance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      );

      setStripe(stripeInStance);
    }

    loadingStripeAsync();
  }, []);

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: {
    metadata: any;
    isSubscription: boolean;
  }) {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata, isSubscription }),
      });

      const data = await response.json();

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {}
  }

  return { stripe, createStripeCheckout };
}
