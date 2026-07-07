import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTree,
  FaLightbulb,
  FaHandshake,
  FaGem,
  FaRocket,
  FaArrowRight,
} from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const values = [
  {
    icon: FaLightbulb,
    title: 'İnovasyon',
    desc: 'En yeni teknolojileri takip ederek sürekli gelişen çözümler üretiyoruz.',
  },
  {
    icon: FaHandshake,
    title: 'Güven',
    desc: 'Şeffaf iletişim ve uzun vadeli iş ortaklıklarına inanıyoruz.',
  },
  {
    icon: FaGem,
    title: 'Kalite',
    desc: 'Her satır kodda altın standartları hedefliyor, detaylara önem veriyoruz.',
  },
  {
    icon: FaRocket,
    title: 'Hız',
    desc: 'Agile süreçlerle projelerinizi zamanında ve bütçe dahilinde teslim ediyoruz.',
  },
];

const timeline = [
  { year: '2018', title: 'Kuruluş', desc: 'LyraCore, İstanbul\'da küçük bir ekip olarak kuruldu.' },
  { year: '2020', title: 'Büyüme', desc: '50\'den fazla proje tamamlayarak ekibimizi genişlettik.' },
  { year: '2023', title: 'Bulut & AI', desc: 'Bulut mimarisi ve yapay zeka hizmetlerini portföyümüze ekledik.' },
  { year: '2026', title: 'Bugün', desc: 'Türkiye genelinde 50+ kurumsal müşteriye hizmet veriyoruz.' },
];

const About = () => (
  <>
    <section className="page-hero">
      <div className="container">
        <motion.div {...fadeUp}>
          <span className="section-tag">Hakkımızda</span>
          <h1>
            Teknolojide <span className="text-gold">Köklerimiz Derin</span>
          </h1>
          <p>
            LyraCore, çınar ağacının gücünden ilham alarak sağlam, büyüyen ve
            güvenilir yazılım çözümleri sunan bir teknoloji şirketidir.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section">
      <div className="container about-grid">
        <motion.div className="about-visual" {...fadeUp}>
          <div className="about-image">
            <div className="about-image-inner">
              <FaTree />
            </div>
            <div className="about-image-glow" />
          </div>
        </motion.div>

        <motion.div className="about-text" {...fadeUp} transition={{ delay: 0.15 }}>
          <h2>
            Hikayemiz <span className="text-gold">LyraCore</span>
          </h2>
          <p>
            2018 yılında kurulan LyraCore, yazılım dünyasında fark yaratma
            vizyonuyla yola çıktı. Adımız, mitolojide müziğin ve bilgeliğin
            sembolü Lyra takımyıldızından; çınar ağacının ise güç, dayanıklılık
            ve büyüme sembolünden ilham alır.
          </p>
          <p>
            Web geliştirmeden mobil uygulamalara, bulut altyapısından yapay
            zekaya kadar geniş bir yelpazede hizmet sunuyoruz. Müşterilerimizin
            dijital dönüşüm yolculuğunda güvenilir bir teknoloji ortağı olmayı
            hedefliyoruz.
          </p>
          <Link to="/iletisim" className="btn btn-gold">
            Bizimle Çalışın <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <motion.div className="section-header" {...fadeUp}>
          <span className="section-tag">Değerlerimiz</span>
          <h2>
            Bizi <span className="text-gold">Farklı Kılan</span> İlkeler
          </h2>
        </motion.div>
        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="value-card"
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="value-icon">
                <v.icon />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <motion.div className="section-header" {...fadeUp}>
          <span className="section-tag">Yolculuğumuz</span>
          <h2>
            <span className="text-gold">Büyüme</span> Hikayemiz
          </h2>
        </motion.div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className="timeline-item"
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
