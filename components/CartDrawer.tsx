"use client";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function CartDrawer() {
  const { items, remove, clear } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const t = useTranslations();

  return (
    <div className="p-4 border-l w-80 fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg">
      <h2 className="font-semibold text-lg mb-4">{t('nav.cart')}</h2>
      <ul className="space-y-2 overflow-y-auto max-h-[60vh]">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.title}</span>
            <button onClick={() => remove(item.id)}>x</button>
          </li>
        ))}
      </ul>
      <p className="mt-4">{t('cart.total', { amount: total.toFixed(2) })}</p>
      <Link href="/cart" className="block mt-4 bg-blue-600 text-white text-center py-2">{t('cart.checkout')}</Link>
      <button className="mt-2 text-sm underline" onClick={clear}>{t('cart.clear')}</button>
    </div>
  );
}
