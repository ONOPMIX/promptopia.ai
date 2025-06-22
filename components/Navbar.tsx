'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold text-xl">promptopia.ai</Link>
      <div className="flex gap-4 items-center">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-2 py-1 border rounded">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <Link href="/auth/login">{t('nav.login')}</Link>
        <Link href="/auth/register">{t('nav.register')}</Link>
      </div>
    </nav>
  );
}
