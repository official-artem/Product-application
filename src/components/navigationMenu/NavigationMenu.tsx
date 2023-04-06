import 'bootstrap/dist/css/bootstrap.min.css';
import cn from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './asideBar.module.css';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

const NavigationMenu: NextPage = memo(
  () => {
    const { locale, pathname } = useRouter();
  
    const { t: translate } = useTranslation();
  
    return <div className={`${styles.aside_container} text-center pt-4 border-end h-auto`}>
      <Image className='mb-5' alt='user-image' src='/user.svg' width={75} height={75} />
  
      <nav className='d-flex flex-column gap-3 fs-6 align-items-center'>
        <Link
          className={cn('animate__animated animate__fadeInUp',
            {
              [styles.active]: pathname.includes('order')
            })}
          href="/orders"
        >
          {translate('menu:orders')}
        </Link>
  
        <Link
          className={cn('animate__animated animate__fadeInUp',
            {
              [styles.active]: pathname.includes('groups')
            })}
          href="/groups"
        >
          {translate('menu:groups')}
        </Link>
  
        <Link
          className={cn('animate__animated animate__fadeInUp',
            {
              [styles.active]: pathname.includes('products')
            })}
          href="/products"
        >
          {translate('menu:products')}
        </Link>
  
        <Link
          className={cn('animate__animated animate__fadeInUp',
            {
              [styles.active]: pathname.includes('users')
            })}
          href="/users"
        >
          {translate('menu:users')}
        </Link>
  
        <Link
          className={cn('animate__animated animate__fadeInUp',
            {
              [styles.active]: pathname.includes('options')
            })}
          href="/options"
        >
          {translate('menu:options')}
        </Link>
      </nav>
    </div>;
  },
);

export default NavigationMenu;