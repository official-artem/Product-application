import Head from 'next/head';
import { FC, PropsWithChildren } from 'react'

interface Props {
  title: string;
}

const Meta: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Application</title>
      </Head>

      {children}
    </>
  )
}

export default Meta