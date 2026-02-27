'use client';

import { projects } from '@/lib/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScene } from '@/context/SceneContext';
import { useEffect } from 'react';
import HUD from '@/components/HUD';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function ProjectsPage() {
  const { setHoveredNodeId, setCameraMode, addSystemLog } = useScene();
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    setCameraMode('projects');
    addSystemLog('[SYSTEM]: Project archive loaded');
    addSystemLog('[SYSTEM]: ' + projects.length + ' nodes isolated');
  }, []);

  return (
    <div className="min-h-screen text-gray-100">
      <HUD />
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-orbitron font-bold text-white">
            NEURAL_ARCHIVE
          </Link>
        </div>
      </nav>
      
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white">
            PROJECT ARCHIVE
          </h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            A curated collection of systems architecture, distributed computing, 
            and full-stack engineering solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/case-study/${project.id}`} onClick={playClickSound}>
                <article 
                  className="group h-full bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)]"
                  onMouseEnter={() => {
                    setHoveredNodeId(project.id);
                    addSystemLog(`[SYSTEM]: Accessing encrypted data for ${project.id.toUpperCase()}...`);
                    playHoverSound();
                  }}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  <div 
                    className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
                    style={{ backgroundColor: project.color + '20' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono">
                      [PROJECT_VISUAL]
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30">
                      {project.id.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 font-mono">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-cyan-400 text-sm font-mono group-hover:translate-x-2 transition-transform">
                      VIEW_CASE_STUDY →
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
