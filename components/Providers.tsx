'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { CartProvider } from '../contexts/CartContext';

export default function Providers({ children, messages }: { children: React.ReactNode; messages: any }) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
