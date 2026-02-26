'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NeuralNetwork() {
  const router = useRouter();
  const [warping, setWarping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple canvas animation placeholder
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Simple star field animation
    const stars: Array<{x: number, y: number, z: number}> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        const x = (star.x / star.z) * canvas.width + canvas.width / 2;
        const y = (star.y / star.z) * canvas.height + canvas.height / 2;
        const size = (1 - star.z / canvas.width) * 2;

        ctx.fillRect(x, y, size, size);

        star.z -= 2;
        if (star.z <= 0) {
          star.z = canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const handleViewAll = () => {
    setWarping(true);
    setTimeout(() => {
      router.push('/projects');
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-bold font-orbitron text-white mb-4 tracking-wider">
            YOUR NAME
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-mono mb-2">
            FULL-STACK ARCHITECT
          </p>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Building distributed systems that scale. From neural networks to cloud infrastructure.
          </p>
          
          <button
            onClick={handleViewAll}
            className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-mono hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,255,204,0.4)] transition-all duration-300 rounded"
          >
            [ VIEW_ALL_PROJECTS ]
          </button>
        </div>
      </div>
      
      {warping && (
        <div className="absolute inset-0 bg-white animate-pulse pointer-events-none" 
             style={{ animation: 'warpFade 1.5s forwards' }} />
      )}
    </div>
  );
}
