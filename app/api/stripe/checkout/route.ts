import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';

export async function POST(req: Request) {
  const { items } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: items.map((i: any) => ({
      price_data: { currency: 'usd', product_data: { name: i.title }, unit_amount: Math.round(i.price * 100) },
      quantity: 1,
    })),
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?canceled=1`,
  });
  return NextResponse.json({ url: session.url });
}
