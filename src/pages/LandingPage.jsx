import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaBrain,
  FaArrowRight,
  FaCheck,
  FaLightbulb,
  FaHandshake,
  FaGem,
  FaRocket,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import heroImage from '../assets/images/hero-tech.jpg';
import aboutImage from '../assets/images/lyracore-bg.png';
import logoImage from '../assets/images/lyracore-bg.png';

const services = [
  { icon: FaCode, title: 'Web Geliştirme', desc: 'React, Node.js ve modern stack ile ölçeklenebilir web uygulamaları.' },
  { icon: FaMobileAlt, title: 'Mobil Uygulama', desc: 'iOS ve Android için native ve cross-platform çözümler.' },
  { icon: FaCloud, title: 'Bulut Altyapı', desc: 'AWS, Azure ve GCP üzerinde güvenli ve performanslı sistemler.' },
  { icon: FaBrain, title: 'Yapay Zeka', desc: 'ML, otomasyon ve akıllı veri analizi entegrasyonları.' },
];

const values = [
  { icon: FaLightbulb, title: 'İnovasyon', desc: 'En yeni teknolojilerle sürekli gelişen çözümler.' },
  { icon: FaHandshake, title: 'Güven', desc: 'Şeffaf iletişim ve uzun vadeli iş ortaklıkları.' },
  { icon: FaGem, title: 'Kalite', desc: 'Her satır kodda altın standartları hedefliyoruz.' },
  { icon: FaRocket, title: 'Hız', desc: 'Agile süreçlerle zamanında teslimat.' },
];

const projects = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Uygulama',
    desc: 'Gerçek zamanlı finansal analiz ve raporlama platformu.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    color: '#d4af37',
  },
  {
    title: 'E-Ticaret Mobil App',
    category: 'Mobil',
    desc: '500K+ kullanıcıya hizmet veren cross-platform alışveriş uygulaması.',
    tags: ['React Native', 'Firebase'],
    color: '#b8962e',
  },
  {
    title: 'AI Destekli CRM',
    category: 'Yapay Zeka',
    desc: 'Müşteri davranış analizi ve otomatik satış tahminleme sistemi.',
    tags: ['Python', 'TensorFlow', 'AWS'],
    color: '#e8c96a',
  },
  {
    title: 'Bulut Migrasyon',
    category: 'DevOps',
    desc: 'Kurumsal altyapının AWS\'e sıfır kesinti ile taşınması.',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    color: '#c9a227',
  },
];

const stats = [
  { value: '120+', label: 'Proje' },
  { value: '50+', label: 'Müşteri' },
  { value: '8+', label: 'Yıl' },
  { value: '99.9%', label: 'Uptime' },
];

const slideFromBottom = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

const slideFromRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

const LandingPage = ({ mousePos }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const parallaxX = mousePos?.x ? (mousePos.x / window.innerWidth - 0.5) * 16 : 0;
  const parallaxY = mousePos?.y ? (mousePos.y / window.innerHeight - 0.5) * 10 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="landing">
      {/* ===== ANASAYFA ===== */}
      <section id="anasayfa" className="landing-hero">
        <div
          className="landing-hero-bg"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `scale(1.05) translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        />
        <div className="landing-hero-overlay" />

        <div className="container landing-hero-inner">
          <motion.div className="landing-hero-content" {...slideFromBottom}>
            <span className="section-tag">LyraCore Yazılım</span>
            <h1>
              Geleceği Kodlayan
              <br />
              <span className="text-gold">Teknoloji Partneriniz</span>
            </h1>
            <p>
              Kurumsal web, mobil ve bulut çözümleriyle işletmenizi dijital dünyada
              güçlendiriyoruz. Sağlam altyapı, altın standartlarda yazılım.
            </p>
            <div className="hero-actions">
              <a href="#iletisim" className="btn btn-gold">
                Proje Başlat <FaArrowRight />
              </a>
              <a href="#projelerimiz" className="btn btn-outline">
                Projelerimiz
              </a>
            </div>
            <ul className="hero-checklist">
              {['Agile teslimat', 'Kurumsal güvenlik', '7/24 destek', 'Ölçeklenebilir mimari'].map((t) => (
                <li key={t}><FaCheck /> {t}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="landing-hero-visual"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <img src={logoImage} alt="LyraCore" className="hero-logo-card" />
            <div className="hero-stat-cards">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="hero-mini-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-item" {...fadeUp} transition={{ delay: i * 0.08 }}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services preview on home */}
      <section className="section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Uzmanlık Alanlarımız</span>
            <h2>End-to-End <span className="text-gold">Yazılım Hizmetleri</span></h2>
          </motion.div>
          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div key={s.title} className="service-card tilt-card" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="service-icon"><s.icon /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HAKKIMIZDA ===== */}
      <section id="hakkimizda" className="section section-alt">
        <div className="container">
          <motion.div className="about-block" {...slideFromRight}>
            <div className="about-image-wrap">
              <img src={aboutImage} alt="LyraCore yazılım ekibi" className="about-photo" />
              <div className="about-image-badge">
                <FaCode />
                <span>2018&apos;den beri</span>
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">Hakkımızda</span>
              <h2>
                Teknolojide <span className="text-gold">Köklerimiz Derin</span>
              </h2>
              <p>
                LyraCore, 2018 yılında İstanbul&apos;da kurulmuş bir yazılım geliştirme
                şirketidir. Çınar ağacının gücünden ilham alarak sağlam, büyüyen ve
                güvenilir dijital çözümler sunuyoruz.
              </p>
              <p>
                Web ve mobil uygulama geliştirmeden bulut mimarisine, yapay zeka
                entegrasyonlarından DevOps süreçlerine kadar uçtan uca hizmet veriyoruz.
                Müşterilerimizin dijital dönüşüm yolculuğunda güvenilir teknoloji ortağıyız.
              </p>
              <p>
                Ekibimiz deneyimli yazılım mühendisleri, UI/UX tasarımcıları ve proje
                yöneticilerinden oluşur. Agile metodoloji ile hızlı iterasyon, şeffaf
                iletişim ve kalite odaklı teslimat prensiplerimizdir.
              </p>

              <div className="values-inline">
                {values.map((v) => (
                  <div key={v.title} className="value-pill">
                    <v.icon />
                    <span>{v.title}</span>
                  </div>
                ))}
              </div>

              <a href="#iletisim" className="btn btn-gold">
                Bizimle Çalışın <FaArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJELERİMİZ ===== */}
      <section id="projelerimiz" className="section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Projelerimiz</span>
            <h2>
              Başarıyla <span className="text-gold">Tamamladığımız</span> İşler
            </h2>
            <p>Farklı sektörlerde hayata geçirdiğimiz yazılım projelerinden örnekler.</p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                className="project-card tilt-card"
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
              >
                <div className="project-header" style={{ borderColor: p.color }}>
                  <span className="project-category">{p.category}</span>
                  <FaExternalLinkAlt className="project-link-icon" />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== İLETİŞİM ===== */}
      <section id="iletisim" className="section section-alt">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">İletişim</span>
            <h2>
              Projenizi <span className="text-gold">Konuşalım</span>
            </h2>
          </motion.div>

          <div className="contact-grid">
            <motion.div className="contact-info" {...fadeUp}>
              <div className="contact-cards">
                {[
                  { icon: FaEnvelope, title: 'Email', value: 'info@lyracore.com', href: 'mailto:info@lyracore.com' },
                  { icon: FaPhone, title: 'Telefon', value: '+90 212 123 45 67', href: 'tel:+902121234567' },
                  { icon: FaMapMarkerAlt, title: 'Adres', value: 'Maslak, İstanbul', href: null },
                ].map((c) => (
                  <div key={c.title} className="contact-card">
                    <div className="contact-card-icon"><c.icon /></div>
                    <div>
                      <h4>{c.title}</h4>
                      {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/login" className="btn btn-outline contact-login-btn">
                Müşteri Girişi <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div className="contact-form-wrap" {...fadeUp} transition={{ delay: 0.15 }}>
              {sent ? (
                <div className="contact-success">
                  <FaPaperPlane />
                  <h3>Mesajınız Gönderildi!</h3>
                  <p>En kısa sürede size dönüş yapacağız.</p>
                  <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
                    Yeni Mesaj
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2>Bize Yazın</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="c-name">Ad Soyad</label>
                      <input id="c-name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Adınız" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="c-email">Email</label>
                      <input id="c-email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="email@firma.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-subject">Konu</label>
                    <input id="c-subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder="Proje konusu" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-message">Mesaj</label>
                    <textarea id="c-message" name="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Projeniz hakkında..." />
                  </div>
                  <button type="submit" className="btn btn-gold btn-lg" disabled={loading}>
                    {loading ? 'Gönderiliyor...' : <>Mesaj Gönder <FaPaperPlane /></>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
