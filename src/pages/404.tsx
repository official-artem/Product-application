import Layout from '@/components/layout/Layout';
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { memo } from 'react';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['menu', 'header'])),
  },
});

const NotFound: NextPage = memo(
  () => {
    return (
      <Layout title='Page not found'>
        <div className='d-flex align-items-center flex-column'>
          <Image src="/in_development.png" width={400} height={400} alt="in development logo" className='mb-5' />
          <h1>In development</h1>
        </div>
      </Layout>
    )
  },
);

export default NotFound