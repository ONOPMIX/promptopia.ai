'use client';
import licenses from '../lib/licenseTemplates.json';
import { useLocale } from 'next-intl';

export default function LicenseBadge({ type }: { type: string }) {
  const locale = useLocale() as 'en' | 'ko';
  const text = (licenses as any)[type]?.[locale] || type;
  return (
    <span
      className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
      title={text}
    >
      {type.replace('_', ' ')}
    </span>
  );
}
