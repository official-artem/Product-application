import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react'
import AsideBarPage from '../asideBar/AsideBar';
import Header from '../header/Header';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {

  return (
    <div>
      <Header />
      <main className='d-flex'>
      <AsideBarPage />
        <div className='w-100 p-5'>
          { children }
        </div>
      </main>
    </div>
  )
}

export default Layout