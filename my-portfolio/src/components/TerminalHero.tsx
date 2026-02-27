'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScene } from '@/context/SceneContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function TerminalHero() {
  const router = useRouter();
  const { addSystemLog, setCameraMode } = useScene();
  const { playClickSound } = useSoundEffects();
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    '> AUTH_USER: YOUR_NAME',
    '> ROLE: FULL-STACK_ARCHITECT',
    '> MISSION: ARCHITECTING_DISTRIBUTED_ECOSYSTEMS',
    '> KEY_SKILLS: [React, Node.js, Kubernetes, AWS]',
  ];

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayedText(line.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLine]);

  const handleInitialize = () => {
    playClickSound();
    addSystemLog('[SYSTEM]: Initializing archive scan...');
    addSystemLog('[SYSTEM]: Loading project nodes...');
    setCameraMode('projects');
    setTimeout(() => {
      router.push('/projects');
    }, 800);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
      <div className="pointer-events-auto">
        {/* Status indicators */}
        <div className="flex gap-8 mb-8 text-xs font-mono text-gray-500">
          <div>[NODE_STATUS: <span className="text-green-400 animate-pulse">ONLINE</span>]</div>
          <div>[LATENCY: <span className="text-cyan-400">12ms</span>]</div>
        </div>

        {/* Terminal output */}
        <div className="glass-panel p-8 rounded-lg border-l-4 border-l-cyan-500 mb-8 min-w-[600px]">
          <div className="font-mono text-sm space-y-2">
            {lines.slice(0, currentLine).map((line, i) => (
              <div key={i} className="text-gray-300">{line}</div>
            ))}
            {currentLine < lines.length && (
              <div className="text-cyan-400">
                {displayedText}
                <span className="animate-pulse">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Initialize button */}
        {currentLine >= lines.length && (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleInitialize}
              className="px-8 py-4 bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 font-mono text-lg hover:bg-cyan-500/20 hover:shadow-[0_0_40px_rgba(0,255,204,0.5)] transition-all duration-300 rounded group"
            >
              <span className="group-hover:text-glow">[ INITIALIZE_SCAN ]</span>
            </button>
            <div className="mt-4 text-xs text-gray-500 font-mono">
              Press to access neural archive
            </div>
          </div>
        )}

        {/* Scrolling activity log */}
        <div className="mt-12 text-xs font-mono text-gray-600 text-center space-y-1">
          <div className="animate-pulse">&gt; Monitoring GitHub activity...</div>
          <div>&gt; Last commit: 2 hours ago</div>
          <div>&gt; Active branches: 3</div>
        </div>
      </div>
    </div>
  );
}
