import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface Props {
  params: { id: string };
}

export default function CaseStudyPage({ params }: Props) {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center">
          <Link href="/" className="font-orbitron font-bold text-white">
            NEURAL_ARCHIVE
          </Link>
        </div>
      </nav>
      
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8 transition-colors font-mono"
        >
          <ArrowLeft size={16} />
          BACK_TO_ARCHIVE
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-sm font-mono text-gray-500">{project.id}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-4 text-white">
            {project.title}
          </h1>
          <p className="text-xl text-cyan-400 font-mono mb-6">
            {project.headline}
          </p>
          
          <div className="flex gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 transition-colors"
              >
                <ExternalLink size={18} />
                LIVE_DEMO
              </a>
            )}
            {project.repoUrl && (
              <a 
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded hover:border-cyan-500 hover:text-cyan-400 transition-colors font-mono"
              >
                <Github size={18} />
                SOURCE_CODE
              </a>
            )}
          </div>
        </header>

        <div 
          className="w-full aspect-video rounded-xl mb-12 flex items-center justify-center border border-gray-800"
          style={{ backgroundColor: project.color + '15' }}
        >
          <span className="text-gray-600 font-mono">[16:9_PROJECT_DEMO_GIF]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-sm font-mono text-red-400 mb-4 tracking-wider">// THE_PROBLEM</h2>
              <div className="bg-[#111] border-l-4 border-red-500/50 p-6 rounded-r-xl">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-mono text-green-400 mb-4 tracking-wider">// THE_SOLUTION</h2>
              <div className="bg-[#111] border-l-4 border-green-500/50 p-6 rounded-r-xl">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">// TECHNICAL_CHALLENGE</h2>
              <div className="bg-[#111] border-l-4 border-cyan-500/50 p-6 rounded-r-xl">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.technicalChallenge}
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-mono text-gray-500 mb-4">TECH_STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-2 bg-gray-800 rounded-lg text-sm text-cyan-300 font-mono border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 font-mono text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">STATUS</span>
                <span className="text-green-400">DEPLOYED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">LAST_COMMIT</span>
                <span>2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">COORDINATES</span>
                <span className="text-cyan-400">
                  X:{project.coordinates.x} Y:{project.coordinates.y}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
