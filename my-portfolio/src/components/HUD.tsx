'use client';

import { useEffect, useState } from 'react';
import { useScene } from '@/context/SceneContext';

export default function HUD() {
  const { systemLogs, addSystemLog } = useScene();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const bootSequence = [
      '[BOOT]: Initializing Neural Interface v4.0.2...',
      '[STATUS]: Establishing handshake... SUCCESS',
      '[ENCRYPTION]: 256-bit AES Layer Active',
      '[LOG]: Loading Core Competencies...',
      '[SYSTEM]: Welcome, User. Integrity Check: 100%'
    ];
    
    bootSequence.forEach((log, i) => {
      setTimeout(() => {
        addSystemLog(log);
      }, i * 400);
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 glass-panel p-4 rounded-br-2xl border-l-4 border-l-cyan-500">
        <h2 className="text-lg font-bold font-orbitron text-cyan-400 mb-2 tracking-widest">
          NEURAL_ARCHIVE.exe
        </h2>
        <div className="text-xs space-y-1 text-gray-300 font-mono">
          <div className="flex justify-between w-48">
            <span>SYS_STATUS:</span>
            <span className="text-green-400 animate-pulse">ONLINE</span>
          </div>
          <div className="flex justify-between w-48">
            <span>UPTIME:</span>
            <span>1,337 HRS</span>
          </div>
          <div className="flex justify-between w-48">
            <span>LATENCY:</span>
            <span>{latency}ms</span>
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-50 glass-panel p-4 rounded-bl-2xl text-right">
        <div className="text-xs text-gray-500 mb-1 font-mono">COORDINATES</div>
        <div className="text-lg font-mono text-cyan-400">
          X: {coords.x.toFixed(2)} | Y: {coords.y.toFixed(2)}
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-50 glass-panel p-4 rounded-tr-2xl w-80 h-32 overflow-hidden">
        <div className="text-[10px] text-gray-500 border-b border-gray-700 pb-1 mb-2 flex justify-between font-mono">
          <span>SYSTEM_LOG</span>
          <span className="animate-pulse text-green-500">● REC</span>
        </div>
        <div className="text-xs font-mono space-y-1 overflow-y-auto h-full text-gray-400">
          {systemLogs.map((log, i) => (
            <div key={i} className="truncate animate-fade-in">{log}</div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 glass-panel p-4 rounded-tl-2xl text-right">
        <div className="text-xs text-gray-500 mb-2 font-mono">MEMORY_BUFFER</div>
        <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden mb-1 ml-auto">
          <div className="h-full bg-cyan-500 w-[42%] animate-pulse" />
        </div>
        <div className="text-[10px] text-gray-400 font-mono">42.8 MB / STABLE</div>
      </div>
    </>
  );
}
