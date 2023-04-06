import { FC, PropsWithChildren, memo } from 'react';
import Header from '../header/Header';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import styles from './layout.module.css';
import Head from 'next/head';
import Meta from '../meta/Meta';

interface Props {
  title: string;
}

const Layout: FC<PropsWithChildren<Props>> = memo(
  ({ children, title }) => {

    return (
      <Meta title={title}>
        <Header />
        <main className='d-flex'>
          <NavigationMenu />
          <div className={`w-100 ${styles.content}`}>
            { children }
          </div>
        </main>
      </Meta>
    )
  },
);

export default Layout