import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const GOLD = { r: 212, g: 175, b: 55 };

const SiteBackground = ({ mousePos }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.02 + 0.008,
    }));

    const animate = () => {
      time++;
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x || w / 2;
      const my = mouseRef.current.y || 0;

      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.drift + p.twinkle) * 0.25;
        p.y += p.speedY + Math.cos(time * p.drift + p.twinkle) * 0.2;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          p.x -= (dx / dist) * 0.25;
          p.y -= (dy / dist) * 0.25;
        }

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const twinkle = 0.35 + Math.sin(time * 0.04 + p.twinkle) * 0.3;
        const alpha = theme === 'light' ? p.opacity * twinkle * 0.7 : p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="site-bg-canvas" aria-hidden="true" />;
};

export default SiteBackground;
