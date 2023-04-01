import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './asideBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import cn from 'classnames';

const AsideBarPage: NextPage = () => {

  const { pathname } = useRouter();
  
  return <div className={`${styles.aside_container} w-25 text-center pt-4 border-end h-auto`}>
    <Image className='m-4' alt='user-image' src='/user.svg' width={50} height={50}/>

    <nav className='d-flex flex-column gap-2 align-items-center'>
      <Link 
        className={cn('animate__animated animate__fadeInUp',
          { 
            [styles.active]: pathname.includes('incoming')
          })} 
          href="/incoming"
      >
        Incoming
      </Link>

      <Link 
        className={cn('animate__animated animate__fadeInUp',
          { 
            [styles.active]: pathname.includes('groups')
          })} 
        href="/groups"
      >
        Groups
      </Link>

      <Link
        className={cn('animate__animated animate__fadeInUp',
          { 
            [styles.active]: pathname.includes('products')
          })} 
        href="/products"
      >
        Products
      </Link>

      <Link
        className={cn('animate__animated animate__fadeInUp',
          { 
            [styles.active]: pathname.includes('users')
          })} 
        href="/users"
      >
        Users
      </Link>

      <Link
        className={cn('animate__animated animate__fadeInUp',
          { 
            [styles.active]: pathname.includes('options')
          })} 
        href="/options"
      >
        Options
      </Link>
    </nav>
  </div>
}

export default AsideBarPage