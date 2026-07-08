import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SiteBackground from '../SiteBackground';
import LandingPage from '../../pages/LandingPage';

const Layout = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="site">
      <SiteBackground mousePos={mousePos} />
      <div
        className="mouse-glow site-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <Navbar />
      <main>
        <LandingPage mousePos={mousePos} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
