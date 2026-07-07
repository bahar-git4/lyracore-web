import { useEffect, useRef } from 'react';

const TreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Basit altın tozu parçacıkları
    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.3 - 0.1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    function animate() {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Arka plan gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(10, 19, 26, 0.95)');
      bgGradient.addColorStop(0.5, 'rgba(20, 34, 47, 0.9)');
      bgGradient.addColorStop(1, 'rgba(10, 19, 26, 0.95)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Çınar ağacı çiz (basit SVG benzeri)
      const centerX = width / 2;
      const centerY = height / 2 + 50;

      // Ağaç gövdesi
      ctx.save();
      
      // Hafif parlama
      const glow = ctx.createRadialGradient(centerX, centerY - 80, 0, centerX, centerY - 80, 250);
      glow.addColorStop(0, 'rgba(234, 176, 48, 0.03)');
      glow.addColorStop(1, 'rgba(234, 176, 48, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 80, 250, 0, Math.PI * 2);
      ctx.fill();

      // Gövde
      const trunkGradient = ctx.createLinearGradient(centerX - 25, centerY, centerX + 25, centerY);
      trunkGradient.addColorStop(0, 'rgba(45, 125, 70, 0.7)');
      trunkGradient.addColorStop(0.5, 'rgba(60, 150, 80, 0.9)');
      trunkGradient.addColorStop(1, 'rgba(45, 125, 70, 0.7)');
      
      ctx.fillStyle = trunkGradient;
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY + 40);
      ctx.quadraticCurveTo(centerX - 30, centerY - 20, centerX - 18, centerY - 70);
      ctx.quadraticCurveTo(centerX - 22, centerY - 110, centerX - 12, centerY - 150);
      ctx.quadraticCurveTo(centerX - 15, centerY - 190, centerX - 8, centerY - 220);
      ctx.quadraticCurveTo(centerX, centerY - 250, centerX + 8, centerY - 220);
      ctx.quadraticCurveTo(centerX + 15, centerY - 190, centerX + 12, centerY - 150);
      ctx.quadraticCurveTo(centerX + 22, centerY - 110, centerX + 18, centerY - 70);
      ctx.quadraticCurveTo(centerX + 30, centerY - 20, centerX + 20, centerY + 40);
      ctx.closePath();
      ctx.fill();

      // Dallar
      const branches = [
        { angle: -0.5, length: 140, startY: -150 },
        { angle: 0.5, length: 140, startY: -150 },
        { angle: -0.8, length: 110, startY: -190 },
        { angle: 0.8, length: 110, startY: -190 },
        { angle: -1.1, length: 70, startY: -220 },
        { angle: 1.1, length: 70, startY: -220 },
      ];

      branches.forEach((branch) => {
        const startX = centerX + Math.sin(branch.angle * 0.5) * 15;
        const endX = startX + Math.sin(branch.angle) * branch.length;
        const endY = centerY + branch.startY + Math.cos(branch.angle) * branch.length * 0.3;

        ctx.strokeStyle = 'rgba(45, 125, 70, 0.6)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, centerY + branch.startY);
        ctx.quadraticCurveTo(
          (startX + endX) / 2 + Math.sin(time * 0.001) * 8,
          (centerY + branch.startY + endY) / 2 - 15,
          endX,
          endY
        );
        ctx.stroke();

        // Yapraklar
        for (let i = 0; i < 4; i++) {
          const leafAngle = branch.angle + (i - 1.5) * 0.4;
          const leafX = endX + Math.sin(leafAngle) * 25;
          const leafY = endY - Math.cos(leafAngle) * 25 + 5;
          
          ctx.fillStyle = `rgba(45, 125, 70, 0.2)`;
          ctx.beginPath();
          ctx.ellipse(leafX, leafY, 15 + Math.random() * 8, 10 + Math.random() * 6, leafAngle, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Altın tozu - ağaç etrafında
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + time * 0.0003;
        const radius = 100 + Math.sin(time * 0.0015 + i) * 30;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY - 140 + Math.sin(angle) * radius * 0.5;

        const size = 1.5 + Math.sin(time * 0.004 + i * 2) * 1;
        const opacity = 0.2 + Math.sin(time * 0.003 + i * 3) * 0.15;

        ctx.fillStyle = `rgba(234, 176, 48, ${opacity})`;
        ctx.shadowColor = 'rgba(234, 176, 48, 0.2)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Parçacıkları çiz (altın tozu)
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.fillStyle = `rgba(234, 176, 48, ${p.opacity})`;
        ctx.shadowColor = 'rgba(234, 176, 48, 0.2)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default TreeBackground;
