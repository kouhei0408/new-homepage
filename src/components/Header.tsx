// Header.tsx
'use client';

const HEADER_OFFSET = 72; // 固定ヘッダーの高さに合わせて調整

export default function Header() {
  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <header className="site-header">
      <nav>
        <a href="#home" onClick={scrollToId('home')}>Home</a>
        <a href="#about" onClick={scrollToId('about')}>About</a>
        <a href="#works" onClick={scrollToId('works')}>Works</a>
        <a href="#contact" onClick={scrollToId('contact')}>Contact</a>
      </nav>
    </header>
  );
}