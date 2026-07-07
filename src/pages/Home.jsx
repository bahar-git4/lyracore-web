import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTree,
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaBrain,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
  FaCheck,
} from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const services = [
  {
    icon: FaCode,
    title: 'Web Geliştirme',
    desc: 'Modern, hızlı ve ölçeklenebilir web uygulamaları. React, Node.js ve bulut mimarisi.',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobil Uygulama',
    desc: 'iOS ve Android için native ve cross-platform mobil çözümler.',
  },
  {
    icon: FaCloud,
    title: 'Bulut Çözümleri',
    desc: 'AWS, Azure ve GCP üzerinde güvenli, yüksek performanslı altyapı.',
  },
  {
    icon: FaBrain,
    title: 'Yapay Zeka',
    desc: 'Makine öğrenmesi, otomasyon ve akıllı veri analizi entegrasyonları.',
  },
];

const stats = [
  { value: '120+', label: 'Tamamlanan Proje' },
  { value: '50+', label: 'Mutlu Müşteri' },
  { value: '8+', label: 'Yıllık Deneyim' },
  { value: '24/7', label: 'Teknik Destek' },
];

const features = [
  'Agile metodoloji ile hızlı teslimat',
  'Kurumsal güvenlik standartları',
  'Ölçeklenebilir mimari tasarım',
  '7/24 teknik destek ve bakım',
];

const Home = () => (
  <>
    <section className="hero">
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-badge">
            <FaTree /> Yazılımın Geleceği Burada
          </span>
          <h1>
            Dijital Dünyada
            <br />
            <span className="text-gold">Kök Salan</span> Teknoloji
          </h1>
          <p>
            LyraCore olarak web, mobil ve bulut tabanlı yazılım çözümleriyle
            işletmenizi bir adım öne taşıyoruz. Altın standartlarda kod, güçlü
            altyapı.
          </p>
          <div className="hero-actions">
            <Link to="/iletisim" className="btn btn-gold">
              Proje Başlat <FaArrowRight />
            </Link>
            <Link to="/hakkimizda" className="btn btn-outline">
              Bizi Tanıyın
            </Link>
          </div>
          <ul className="hero-features">
            {features.map((f) => (
              <li key={f}>
                <FaCheck /> {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-card hero-card-main">
            <div className="hero-card-icon">
              <FaTree />
            </div>
            <h3>LyraCore Platform</h3>
            <p>Kurumsal yazılım çözümleri</p>
            <div className="hero-card-stats">
              <div>
                <strong>99.9%</strong>
                <span>Uptime</span>
              </div>
              <div>
                <strong>50ms</strong>
                <span>Yanıt Süresi</span>
              </div>
            </div>
          </div>
          <div className="hero-card hero-card-float hero-card-1">
            <FaRocket />
            <span>Hızlı Teslimat</span>
          </div>
          <div className="hero-card hero-card-float hero-card-2">
            <FaShieldAlt />
            <span>Güvenli Altyapı</span>
          </div>
          <div className="hero-card hero-card-float hero-card-3">
            <FaUsers />
            <span>Uzman Ekip</span>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="stats-bar">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section" id="hizmetler">
      <div className="container">
        <motion.div className="section-header" {...fadeUp}>
          <span className="section-tag">Hizmetlerimiz</span>
          <h2>
            İhtiyacınıza Özel <span className="text-gold">Yazılım Çözümleri</span>
          </h2>
          <p>Fikirden ürüne, tasarımdan dağıtıma kadar uçtan uca hizmet sunuyoruz.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="service-icon">
                <s.icon />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to="/iletisim" className="service-link">
                Detaylı Bilgi <FaArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container cta-banner">
        <motion.div className="cta-content" {...fadeUp}>
          <h2>
            Projenizi <span className="text-gold">Hayata Geçirelim</span>
          </h2>
          <p>
            Ücretsiz danışmanlık görüşmesi için hemen iletişime geçin. Ekibimiz
            size en uygun çözümü sunmaya hazır.
          </p>
          <Link to="/iletisim" className="btn btn-gold btn-lg">
            Ücretsiz Teklif Al <FaArrowRight />
          </Link>
        </motion.div>
        <motion.div className="cta-visual" {...fadeUp} transition={{ delay: 0.2 }}>
          <div className="cta-ring" />
          <FaTree className="cta-tree" />
        </motion.div>
      </div>
    </section>
  </>
);

export default Home;
