"use client";
export const dynamic = "force-dynamic";
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    router.push('/');
  };

  const google = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
    router.push('/');
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Register</h2>
      <input className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-600 text-white p-2" type="submit">Register</button>
      <button type="button" onClick={google} className="bg-red-500 text-white p-2">Continue with Google</button>
    </form>
  );
}
