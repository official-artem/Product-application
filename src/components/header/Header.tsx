import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react'
import Data from '../date/date';
import styles from './header.module.css';

const Header: FC = () => {
  return <div className='shadow-lg px-5 d-flex justify-content-between align-items-center'>
    <Link href='/'>
      <Image priority alt='logo' src={'/logo.png'} width={75} height={50} />
    </Link>

    <form>
      <input size={50} className={`${styles.input} form-control`} placeholder='Search' type="text" />
    </form>

    <Data />
  </div>
}

export default Header