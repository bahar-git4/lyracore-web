import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const contactInfo = [
  { icon: FaEnvelope, title: 'Email', value: 'info@lyracore.com', href: 'mailto:info@lyracore.com' },
  { icon: FaPhone, title: 'Telefon', value: '+90 212 123 45 67', href: 'tel:+902121234567' },
  { icon: FaMapMarkerAlt, title: 'Adres', value: 'Maslak, İstanbul, Türkiye', href: null },
  { icon: FaClock, title: 'Çalışma Saatleri', value: 'Pzt – Cum, 09:00 – 18:00', href: null },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Contact:', form);
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <motion.div {...fadeUp}>
            <span className="section-tag">İletişim</span>
            <h1>
              Birlikte <span className="text-gold">Harika Şeyler</span> Yapalım
            </h1>
            <p>
              Projeniz hakkında konuşmak veya ücretsiz danışmanlık almak için
              formu doldurun. En kısa sürede size dönüş yapacağız.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <motion.div className="contact-info" {...fadeUp}>
            <h2>İletişim Bilgileri</h2>
            <p>Size en uygun kanaldan ulaşabilirsiniz.</p>
            <div className="contact-cards">
              {contactInfo.map((c) => (
                <div key={c.title} className="contact-card">
                  <div className="contact-card-icon">
                    <c.icon />
                  </div>
                  <div>
                    <h4>{c.title}</h4>
                    {c.href ? (
                      <a href={c.href}>{c.value}</a>
                    ) : (
                      <span>{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-form-wrap" {...fadeUp} transition={{ delay: 0.15 }}>
            {sent ? (
              <div className="contact-success">
                <FaPaperPlane />
                <h3>Mesajınız Gönderildi!</h3>
                <p>En kısa sürede size geri dönüş yapacağız.</p>
                <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Bize Yazın</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Ad Soyad</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Adınız Soyadınız"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Proje konusu"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesaj</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Projeniz hakkında bilgi verin..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gold btn-lg" disabled={loading}>
                  {loading ? 'Gönderiliyor...' : (
                    <>
                      Mesaj Gönder <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
