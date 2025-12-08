'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <header>
      <div className="title-bar">
        <div className="name">
          <Link href="/">Aakash</Link>
        </div>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/skills">Skills</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <span className="material-icons">{isDark ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </div>
    </header>
  );
}
