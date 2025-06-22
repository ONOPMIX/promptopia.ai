"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase';
import { listPromptsByUser } from '../../../lib/repositories/prompts';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const fetchData = async () => {
      const data = await listPromptsByUser(user.uid);
      setPrompts(data);
    };
    fetchData();
  }, [router]);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Your Prompts</h1>
      <ul>
        {prompts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
