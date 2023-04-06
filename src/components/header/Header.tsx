import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo } from 'react';
import LanguageSelecor from '../languageSelector/languageSelecor';
import TopMenu from '../topMenu/TopMenu';
import styles from './header.module.css';

const Header: FC = memo(
  () => {
    const { t: translate } = useTranslation();
  
    return (
      <div className={`${styles.header} shadow-lg header px-5 d-flex justify-content-between align-items-center ${styles.bar}`}>
        <Link href='/'>
          <Image priority alt='logo' src={'/logo.png'} width={75} height={50} />
        </Link>

        <form>
          <input
            size={50}
            className={`${styles.input} form-control`}
            placeholder={translate('header:placeholder') || 'Search'}
            type="text"
          />
        </form>

        <TopMenu />

        <LanguageSelecor />
      </div>
    )
  },
);

export default Header