"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { getPrompt } from '../../../../lib/repositories/prompts';
import FavoriteButton from '../../../../components/FavoriteButton';
import { useCart } from '../../../../contexts/CartContext';

export default function PromptPage({ params }: any) {
  const [data, setData] = useState<any>(null);
  const { add } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const p = await getPrompt(params.id);
      setData(p);
    };
    fetchData();
  }, [params.id]);

  if (!data) return <div className="p-4">Loading...</div>;

  const runLink = data.toolUrlTemplate ? data.toolUrlTemplate.replace('{prompt}', encodeURIComponent(data.prompt)) + (data.affiliate ? `?aff=${data.affiliate}` : '') : null;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <FavoriteButton promptId={params.id} />
      <p>{data.description}</p>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap break-words">{data.prompt}</pre>
      {runLink && (
        <a href={runLink} target="_blank" className="block bg-green-600 text-white px-4 py-2 text-center rounded">Run in Tool</a>
      )}
      <button onClick={() => add({ id: params.id, title: data.title, price: data.price })} className="bg-blue-600 text-white px-4 py-2">Add to Cart</button>
    </div>
  );
}
