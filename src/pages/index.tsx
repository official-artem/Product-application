import { Inter } from 'next/font/google'
import Home from '@/components/screens/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['menu', 'header'])),
  },
});

export default function HomePage() {
  return <Home />
}
