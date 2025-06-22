import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations();
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">{t('home.welcome')}</h1>
      <p className="mb-6">{t('home.subtitle')}</p>
    </div>
  );
}
