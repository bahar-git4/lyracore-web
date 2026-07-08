import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';
import treeIcon from '../../assets/images/lyracore-tree.png';

const links = [
  { hash: '#anasayfa', label: 'Anasayfa' },
  { hash: '#hakkimizda', label: 'Hakkımızda' },
  { hash: '#projelerimiz', label: 'Projelerimiz' },
  { hash: '#iletisim', label: 'İletişim' },
];

const scrollToSection = (hash) => {
  const el = document.querySelector(hash);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#anasayfa');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links.map((l) => l.hash);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    scrollToSection(hash);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#anasayfa" className="navbar-brand" onClick={(e) => handleNavClick(e, '#anasayfa')}>
            <img src={treeIcon} alt="" className="brand-icon" aria-hidden="true" />
            <span className="brand-text">Lyra<span>Core</span></span>
          </a>

          <nav className="navbar-links">
            {links.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                className={activeSection === link.hash ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-gold btn-sm">Giriş Yap</Link>
            <button type="button" className="navbar-toggle" onClick={() => setMenuOpen(true)} aria-label="Menü">
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.aside className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}>
              <button type="button" className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Kapat">
                <FaTimes />
              </button>
              <nav className="mobile-nav">
                {links.map((link, i) => (
                  <motion.div key={link.hash} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <a href={link.hash} onClick={(e) => handleNavClick(e, link.hash)}>{link.label}</a>
                  </motion.div>
                ))}
                <Link to="/login" className="btn btn-gold mobile-login">Giriş Yap</Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
