"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useTranslations } from 'next-intl';

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, 'reports'));
      setReports(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">{t('admin.reports')}</h1>
      <ul className="space-y-2">
        {reports.map(r => (
          <li key={r.id} className="border p-2 rounded">
            {r.promptId} – {r.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
