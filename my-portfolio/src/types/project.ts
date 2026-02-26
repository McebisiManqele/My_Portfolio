export interface Project {
  id: string;
  title: string;
  headline: string;
  summary: string;
  problem: string;
  solution: string;
  technicalChallenge: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  coordinates: { x: number; y: number; z: number };
  color: string;
}
