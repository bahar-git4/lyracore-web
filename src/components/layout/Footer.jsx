import { Link } from 'react-router-dom';
import { FaTree, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">
            <FaTree />
          </span>
          <span className="brand-text">
            Lyra<span>Core</span>
          </span>
        </Link>
        <p>
          Geleceği kodluyoruz. Web, mobil ve bulut tabanlı yazılım çözümleriyle
          işletmenizi dijital dünyada öne çıkarıyoruz.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="mailto:info@lyracore.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Sayfalar</h4>
        <Link to="/">Anasayfa</Link>
        <Link to="/hakkimizda">Hakkımızda</Link>
        <Link to="/#hizmetler">Hizmetler</Link>
        <Link to="/iletisim">İletişim</Link>
      </div>

      <div className="footer-col">
        <h4>Hizmetler</h4>
        <a href="/#hizmetler">Web Geliştirme</a>
        <a href="/#hizmetler">Mobil Uygulama</a>
        <a href="/#hizmetler">Bulut Çözümleri</a>
        <a href="/#hizmetler">Yapay Zeka</a>
      </div>

      <div className="footer-col">
        <h4>İletişim</h4>
        <a href="mailto:info@lyracore.com">info@lyracore.com</a>
        <a href="tel:+902121234567">+90 212 123 45 67</a>
        <span>İstanbul, Türkiye</span>
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
