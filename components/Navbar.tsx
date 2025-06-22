'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import CartDrawer from './CartDrawer';
import { useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold text-xl">promptopia.ai</Link>
      <div className="flex gap-4 items-center">
        <Link href="/marketplace">{t('nav.market')}</Link>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-2 py-1 border rounded">
          {theme === 'dark' ? t('btn.light') : t('btn.dark')}
        </button>
        <button onClick={() => setOpen(!open)}>🛒</button>
        <Link href="/auth/login">{t('nav.login')}</Link>
        <Link href="/auth/register">{t('nav.register')}</Link>
      </div>
      {open && <CartDrawer />}
    </nav>
  );
}
