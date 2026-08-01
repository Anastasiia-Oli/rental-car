'use client';

import { useEffect, useState } from 'react';
import css from './ScrollToTopButton.module.css';

const SHOW_AFTER_PX = 400;

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className={css.button}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg className={css.icon} width="20" height="20">
        <use href="/sprite.svg#icon-up" />
      </svg>
    </button>
  );
}

export default ScrollToTopButton;
