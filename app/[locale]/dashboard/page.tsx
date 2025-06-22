"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { auth, db } from '../../../lib/firebase';
import { listPromptsByUser } from '../../../lib/repositories/prompts';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';

export default function DashboardPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const fetchData = async () => {
      const data = await listPromptsByUser(user.uid);
      setPrompts(data);
      const favSnap = await getDocs(collection(db, 'users', user.uid, 'favorites'));
      setFavorites(favSnap.docs.map((d) => d.id));
    };
    fetchData();
  }, [router]);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <section>
        <h1 className="text-xl font-semibold mb-4">{t('dashboard.yourPrompts')}</h1>
        <ul>{prompts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.favorites')}</h2>
        <ul>{favorites.map((id) => <li key={id}>{id}</li>)}</ul>
      </section>
    </div>
  );
}
