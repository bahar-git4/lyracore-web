import { useEffect, useRef } from 'react';
import bgImage from '../assets/images/lyracore-bg.png';

const GOLD = { r: 212, g: 175, b: 55 }; // #D4AF37

const GoldDustBackground = ({ mousePos }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const bgRef = useRef(null);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || !mousePos.x) return;

    const offsetX = (mousePos.x / window.innerWidth - 0.5) * 20;
    const offsetY = (mousePos.y / window.innerHeight - 0.5) * 12;
    bg.style.transform = `scale(1.08) translate(${offsetX}px, ${offsetY}px)`;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.5 + 0.15,
      twinkle: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2,
      orbit: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      time++;
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x || w / 2;
      const my = mouseRef.current.y || h / 2;

      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.angle += p.orbit * 0.01;
        p.x += p.speedX + Math.sin(time * p.drift + p.twinkle) * 0.4;
        p.y += p.speedY + Math.cos(time * p.drift + p.twinkle) * 0.3;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.x -= (dx / dist) * 0.5;
          p.y -= (dy / dist) * 0.5;
        }

        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        const twinkle = 0.4 + Math.sin(time * 0.05 + p.twinkle) * 0.35;
        const alpha = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
        ctx.fill();

        if (p.size > 1.2) {
          ctx.shadowColor = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.6)`;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="auth-bg" aria-hidden="true">
      <div
        ref={bgRef}
        className="auth-bg-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="auth-bg-overlay" />
      <canvas ref={canvasRef} className="gold-dust-canvas" />
    </div>
  );
};

export default GoldDustBackground;




 