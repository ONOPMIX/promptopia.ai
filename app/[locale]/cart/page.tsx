"use client";
import { useCart } from '../../../contexts/CartContext';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

export default function CartPage() {
  const { items } = useCart();
  const router = useRouter();

  const checkout = async () => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const { url } = await res.json();
    router.push(url);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {items.map((i) => (
        <div key={i.id} className="flex justify-between border-b py-2">
          <span>{i.title}</span>
          <span>{i.price}</span>
        </div>
      ))}
      <button onClick={checkout} className="mt-4 bg-blue-600 text-white px-4 py-2">Checkout</button>
    </div>
  );
}
