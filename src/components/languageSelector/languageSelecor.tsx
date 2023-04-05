import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react'
import styles from './languageSelector.module.css';

const LanguageSelecor: FC = () => {
  const {locales, pathname} = useRouter();
  const [dropdownHeight, setDropdownHeight] = useState(false);

  const style = {
    opacity: dropdownHeight ? '1' : '0',
    'z-index': dropdownHeight ? '111' : '-2',
    transition: 'opacity 0.3s ease',
  };
  
  return (
    <>
      <div className='dropdown'>
        <div 
          className={`border border-4 p-2 rounded border-dark-subtle ${styles.dropdown}`}
          onClick={() => setDropdownHeight((prev) => !prev)}
        >
          Select Language
        </div>
  
        <div className={`${styles.dropdown_content}`} style={style}>
        {locales?.map((l, id) => (
          <Link 
            className={`d-block ${styles.lang}`} 
            key={id} 
            href={pathname} 
            locale={l}
            onClick={() => setDropdownHeight(false)}
          >
            {l}
          </Link>
        ))}
        </div>
      </div>
    </>
  )
}

export default LanguageSelecor

