import TerminalHero from '@/components/TerminalHero';
import HUD from '@/components/HUD';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <TerminalHero />
      <HUD />
    </main>
  );
}
