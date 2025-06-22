'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Providers({ children, messages }: { children: React.ReactNode; messages: any }) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
