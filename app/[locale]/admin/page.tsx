"use client";
export const dynamic = "force-dynamic";
import { useTranslations } from 'next-intl';
export default function AdminPage() {
  const t = useTranslations();
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">{t('admin.title')}</h1>
      <ul className="space-y-2">
        <li><a href="/admin/orders" className="underline">{t('admin.orders')}</a></li>
        <li><a href="/admin/reports" className="underline">{t('admin.reports')}</a></li>
      </ul>
    </div>
  );
}
