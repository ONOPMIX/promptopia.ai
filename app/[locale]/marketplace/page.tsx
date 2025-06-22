"use client";
export const dynamic = "force-dynamic";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listPrompts } from '../../../lib/repositories/prompts';

export default function MarketplacePage() {
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listPrompts();
      setPrompts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {prompts.map(p => (
        <Link key={p.id} href={`/prompt/${p.id}`} className="border p-4 block">
          <h3 className="font-semibold mb-2">{p.title}</h3>
          <p className="text-sm">{p.description}</p>
        </Link>
      ))}
    </div>
  );
}
