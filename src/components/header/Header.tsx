import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react'
import Data from '../data/data';
import styles from './header.module.css';

const Header: FC = () => {
  return <div className='shadow-lg px-5 d-flex justify-content-between align-items-center'>
    <Link href='/'>
      <Image alt='logo' src={'/logo.png'} width={75} height={50} />
    </Link>

    <form>
      <input size={50} className={styles.input} placeholder='Поиск' type="text" />
    </form>

    <Data />
  </div>
}

export default Header