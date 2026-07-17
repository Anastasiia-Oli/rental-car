'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import { useEffect, useState } from 'react';

function Header() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false); //down
      } else {
        setVisible(true); //up
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${css.header} ${visible ? css.headerVisible : css.headerHidden}`}
    >
      <Link className={css.logo} href="/" aria-label="Home">
        <svg width="104" height="16">
          <use href="/sprite.svg#icon-logo" />
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.li}>
            <Link
              className={pathname === '/' ? css.active : css.link}
              href="/"
              aria-label="Home"
            >
              Home
            </Link>
          </li>
          <li className={css.li}>
            <Link
              className={pathname === '/catalog' ? css.active : css.link}
              href="/catalog"
              aria-label="Catalog"
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
