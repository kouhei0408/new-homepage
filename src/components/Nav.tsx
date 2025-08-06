'use client';

import { useEffect, useRef } from 'react';
import { toggleTheme, initTheme } from '@/lib/theme';

export default function Nav() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        initTheme();
        const nav = navRef.current!;
        let lastY = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    const dir = y > lastY ? 'down' : 'up';
                    lastY = y;
                    if (y > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
                    nav.classList.toggle('scroll-down', dir === 'down' && y > 10);
                    nav.classList.toggle('scroll-up', dir === 'up' && y > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // IntersectionObserver for active link
        const links = Array.from(document.querySelectorAll('.nav a'));
        const sections = Array.from(document.querySelectorAll('main section'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const id = (e.target as HTMLElement).id;
                    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    return (
        <nav ref={navRef} className="nav" aria-label="Primary">
            <div className="brand">toriba14</div>
            <div className="nav-links">
                <a href="#home" className="active" onClick={(e) => onAnchorClick(e, 'home')}>Home</a>
                <a href="#about" onClick={(e) => onAnchorClick(e, 'about')}>About</a>
                <a href="#gallery" onClick={(e) => onAnchorClick(e, 'gallery')}>Gallery</a>
                <a href="#links" onClick={(e) => onAnchorClick(e, 'links')}>Links</a>
            </div>
            <button className="theme-toggle" aria-label="Toggle theme" title="テーマ切替" onClick={toggleTheme}>
                <span className="sun">☀️</span>
                <span className="moon">🌙</span>
            </button>
        </nav>
    );
}
const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};