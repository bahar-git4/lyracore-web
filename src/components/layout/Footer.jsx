import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import treeIcon from '../../assets/images/lyracore-tree.png';

const scrollTo = (hash) => (e) => {
  e.preventDefault();
  const el = document.querySelector(hash);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <a href="#anasayfa" className="navbar-brand" onClick={scrollTo('#anasayfa')}>
          <img src={treeIcon} alt="" className="brand-icon" aria-hidden="true" />
          <span className="brand-text">Lyra<span>Core</span></span>
        </a>
        <p>
          Web, mobil ve bulut tabanlı yazılım çözümleriyle işletmenizi dijital
          dünyada öne çıkarıyoruz.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:info@lyracore.com" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Sayfalar</h4>
        <a href="#anasayfa" onClick={scrollTo('#anasayfa')}>Anasayfa</a>
        <a href="#hakkimizda" onClick={scrollTo('#hakkimizda')}>Hakkımızda</a>
        <a href="#projelerimiz" onClick={scrollTo('#projelerimiz')}>Projelerimiz</a>
        <a href="#iletisim" onClick={scrollTo('#iletisim')}>İletişim</a>
      </div>

      <div className="footer-col">
        <h4>Hizmetler</h4>
        <span>Web Geliştirme</span>
        <span>Mobil Uygulama</span>
        <span>Bulut Çözümleri</span>
        <span>Yapay Zeka</span>
      </div>

      <div className="footer-col">
        <h4>İletişim</h4>
        <a href="mailto:info@lyracore.com">info@lyracore.com</a>
        <a href="tel:+902121234567">+90 212 123 45 67</a>
        <span>İstanbul, Türkiye</span>
        <Link to="/login" className="footer-login">Müşteri Girişi →</Link>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="container">
        <p>© 2026 LyraCore. Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
