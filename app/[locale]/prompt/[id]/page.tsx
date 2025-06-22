"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { getPrompt } from '../../../../lib/repositories/prompts';

export default function PromptPage({ params }: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const p = await getPrompt(params.id);
      setData(p);
    };
    fetchData();
  }, [params.id]);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="mb-4">{data.description}</p>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap break-words">{data.prompt}</pre>
    </div>
  );
}
