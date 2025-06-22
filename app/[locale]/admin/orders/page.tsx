"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { db } from '../../../../lib/firebase';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, 'orders'));
      setOrders(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    };
    fetchData();
  }, []);

  const toggleHold = async (id: string, val: boolean) => {
    await updateDoc(doc(db, 'orders', id), { payoutHold: !val });
    setOrders(o => o.map(ord => ord.id === id ? { ...ord, payoutHold: !val } : ord));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">{t('admin.orders')}</h1>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Amount</th>
            <th>Hold</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b">
              <td>{o.id}</td>
              <td>{o.buyer}</td>
              <td>{o.seller}</td>
              <td>{o.amount}</td>
              <td>
                <button onClick={() => toggleHold(o.id, o.payoutHold)} className="underline">
                  {o.payoutHold ? t('orders.release') : t('orders.hold')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
