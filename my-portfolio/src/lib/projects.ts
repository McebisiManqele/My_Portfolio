import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: "nebula-commerce",
    title: "Nebula Commerce",
    headline: "Distributed E-Commerce Platform",
    summary: "High-throughput transactional system handling 10k+ orders/minute",
    problem: "Legacy monolith couldn't scale during flash sales, causing $2M in lost revenue",
    solution: "Microservices architecture with event-driven inventory management",
    technicalChallenge: "Maintaining ACID compliance across distributed services without sacrificing performance",
    stack: ["React", "Node.js", "Kafka", "PostgreSQL", "Redis"],
    image: "/projects/nebula.jpg",
    liveUrl: "https://demo.example.com",
    repoUrl: "https://github.com/example/nebula",
    coordinates: { x: 15, y: 5, z: 0 },
    color: "#00ffff"
  },
  {
    id: "quantum-ledger",
    title: "Quantum Ledger",
    headline: "Blockchain Visualization Engine",
    summary: "Real-time transaction tracing for financial audits",
    problem: "Auditors couldn't trace complex crypto transactions across multiple chains",
    solution: "WebGL-powered force-directed graph with real-time data ingestion",
    technicalChallenge: "Rendering 100k+ nodes at 60fps while streaming live data",
    stack: ["Three.js", "Vue", "Python", "WebGL", "GraphQL"],
    image: "/projects/quantum.jpg",
    coordinates: { x: -10, y: 12, z: 5 },
    color: "#ff00ff"
  },
  {
    id: "bio-sync",
    title: "Bio-Sync Monitor",
    headline: "IoT Health Dashboard",
    summary: "Remote patient monitoring for 50k+ devices",
    problem: "Hospital staff overwhelmed by false alarms from legacy monitoring systems",
    solution: "ML-powered anomaly detection with predictive alerting",
    technicalChallenge: "Processing biometrics via MQTT with <50ms latency on edge devices",
    stack: ["Angular", "Firebase", "TensorFlow", "MQTT", "Edge TPU"],
    image: "/projects/biosync.jpg",
    coordinates: { x: -12, y: -8, z: -5 },
    color: "#00ff00"
  },
  {
    id: "sentiment-core",
    title: "Sentiment Core",
    headline: "NLP Analytics Platform",
    summary: "Global social media emotion mapping",
    problem: "Brands couldn't gauge real-time public sentiment during crisis events",
    solution: "Distributed NLP pipeline with geographic heatmap visualization",
    technicalChallenge: "Processing 1M+ tweets/hour in 12 languages with context awareness",
    stack: ["Python", "PyTorch", "Mapbox", "React", "Kubernetes"],
    image: "/projects/sentiment.jpg",
    coordinates: { x: 8, y: -10, z: 8 },
    color: "#ffff00"
  },
  {
    id: "void-cms",
    title: "Void CMS",
    headline: "Headless Content System",
    summary: "Offline-first CMS for space operations",
    problem: "Satellite internet too unreliable for standard cloud-based CMS workflows",
    solution: "CRDT-based sync engine with conflict-free collaborative editing",
    technicalChallenge: "Ensuring data consistency with intermittent 2kbps connectivity",
    stack: ["Next.js", "Rust", "Yjs", "WebRTC", "SQLite"],
    image: "/projects/void.jpg",
    coordinates: { x: 0, y: 0, z: -15 },
    color: "#ff3333"
  }
];
