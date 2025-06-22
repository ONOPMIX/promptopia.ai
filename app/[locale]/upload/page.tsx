"use client";
export const dynamic = "force-dynamic";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createPrompt } from '../../../lib/repositories/prompts';
import { useRouter } from 'next/navigation';

const LICENSES = [
  { value: 'personal_use', label: 'Personal' },
  { value: 'commercial_use', label: 'Commercial' },
  { value: 'exclusive_transfer', label: 'Exclusive' },
];

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState('0');
  const [license, setLicense] = useState(LICENSES[0].value);
  const [toolUrlTemplate, setToolUrlTemplate] = useState('');
  const [affiliateCode, setAffiliateCode] = useState('');
  const router = useRouter();
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPrompt({
      title,
      description,
      model,
      prompt,
      previewUrl,
      tags: tags.split(',').map((t) => t.trim()),
      price: Number(price),
      license,
      toolUrlTemplate: toolUrlTemplate || undefined,
      affiliateCode: affiliateCode || undefined,
    });
    router.push('/marketplace');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-2 mt-10">
      <h2 className="text-2xl font-semibold mb-4">{t('upload.title')}</h2>
      <input className="border p-2" placeholder={t('upload.titleInput')} value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2" placeholder={t('upload.description')} value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.model')} value={model} onChange={(e) => setModel(e.target.value)} />
      <textarea className="border p-2" placeholder={t('upload.prompt')} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.previewUrl')} value={previewUrl} onChange={(e) => setPreviewUrl(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.tags')} value={tags} onChange={(e) => setTags(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.price')} value={price} onChange={(e) => setPrice(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.toolUrl')} value={toolUrlTemplate} onChange={(e) => setToolUrlTemplate(e.target.value)} />
      <input className="border p-2" placeholder={t('upload.affiliate')} value={affiliateCode} onChange={(e) => setAffiliateCode(e.target.value)} />
      <select className="border p-2" value={license} onChange={(e) => setLicense(e.target.value)}>
        {LICENSES.map((l) => (
          <option key={l.value} value={l.value}>{t('license.' + l.value)}</option>
        ))}
      </select>
      <button className="bg-blue-600 text-white p-2 mt-2" type="submit">{t('upload.submit')}</button>
    </form>
  );
}
