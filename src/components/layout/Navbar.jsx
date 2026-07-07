import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

const links = [
  { to: '/', label: 'Anasayfa' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/#hizmetler', label: 'Hizmetler' },
  { to: '/iletisim', label: 'İletişim' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">
              <FaTree />
            </span>
            <span className="brand-text">
              Lyra<span>Core</span>
            </span>
          </Link>

          <nav className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="navbar-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-gold btn-sm">
              Giriş Yap
            </Link>
            <button
              type="button"
              className="navbar-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Menüyü aç"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <button
                type="button"
                className="mobile-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Menüyü kapat"
              >
                <FaTimes />
              </button>
              <nav className="mobile-nav">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </motion.div>
                ))}
                <Link to="/login" className="btn btn-gold mobile-login">
                  Giriş Yap
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
