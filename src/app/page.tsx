import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Links from '@/components/Links';
import ThemeLayer from '@/components/ThemeLayer';
import profile from '@/content/profile.json';
import gallery from '@/content/gallery.json';

export const revalidate = false; // 完全SSG

export default function Page() {
  return (
    <>
      <Nav />
      <ThemeLayer />
      <main>
        <section id="home" className="container hero">
          <Hero />
        </section>
        <section id="about" className="container">
          <About profile={profile} />
        </section>
        <section id="gallery" className="container">
          <Gallery items={gallery} />
        </section>
        <section id="links" className="container">
          <Links />
        </section>
      </main>
      <footer>
        <div>© {new Date().getFullYear()} toriba14</div>
        <div className="muted small">Built with Next.js (SSG) · Theme toggle</div>
      </footer>
    </>
  );
}