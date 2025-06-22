"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { getPrompt } from '../../../../lib/repositories/prompts';
import FavoriteButton from '../../../../components/FavoriteButton';
import LicenseBadge from '../../../../components/LicenseBadge';
import { useCart } from '../../../../contexts/CartContext';
import { useTranslations } from 'next-intl';

export default function PromptPage({ params }: any) {
  const [data, setData] = useState<any>(null);
  const { add } = useCart();
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      const p = await getPrompt(params.id);
      setData(p);
    };
    fetchData();
  }, [params.id]);

  if (!data) return <div className="p-4">{t('loading')}</div>;

  const runLink = data.toolUrlTemplate
    ? data.toolUrlTemplate
        .replace('{{PROMPT}}', encodeURIComponent(data.prompt))
        .replace('{{AFF}}', encodeURIComponent(data.affiliateCode || ''))
    : null;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <LicenseBadge type={data.license} />
      <FavoriteButton promptId={params.id} />
      <p>{data.description}</p>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap break-words">{data.prompt}</pre>
      {runLink && (
        <a href={runLink} target="_blank" className="block bg-green-600 text-white px-4 py-2 text-center rounded">{t('prompt.run')}</a>
      )}
      <button onClick={() => add({ id: params.id, title: data.title, price: data.price })} className="bg-blue-600 text-white px-4 py-2">{t('prompt.addCart')}</button>
    </div>
  );
}
