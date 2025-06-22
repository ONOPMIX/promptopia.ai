"use client";
export const dynamic = "force-dynamic";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listPrompts } from '../../../lib/repositories/prompts';
import FilterSidebar, { Filters } from '../../../components/FilterSidebar';

export default function MarketplacePage() {
  const [prompts, setPrompts] = useState<any[]>([]);

  const load = async (f?: Filters) => {
    const data = await listPrompts(f);
    setPrompts(data);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex">
      <FilterSidebar onChange={load} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 p-4">
        {prompts.map((p) => (
          <Link key={p.id} href={`/prompt/${p.id}`} className="border p-4 block rounded">
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
