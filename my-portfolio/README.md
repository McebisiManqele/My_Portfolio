# My Portfolio - Neural Network Archive

A futuristic 3D portfolio with persistent neural network engine, terminal-style UI, and synchronized interactions between 2D and 3D elements.

## Features

- 🌌 **Persistent 3D Neural Network** - Stays mounted across all routes
- 🎯 **Synchronized Interactions** - Hover on project cards to highlight 3D nodes
- 📺 **Terminal Hero** - Typewriter effect with system initialization
- 🎥 **Camera Transitions** - Smooth camera movements between routes
- 💫 **Neural Pulse Animation** - Breathing effect from core to project nodes
- 📊 **Live System Logs** - Real-time HUD with activity tracking
- 🎨 **Cyberpunk Glassmorphism** - Dark mode with neon accents
- ⚡ Built with Next.js 14, React Three Fiber, TypeScript, and Tailwind CSS

## Architecture

### The Core Engine
The 3D neural network is wrapped in a `<GlobalCanvas />` that persists across route changes. It's not a background - it's the living core of your portfolio.

### State Synchronization
- **SceneContext**: Global state management for 3D ↔ 2D communication
- **Hover Sync**: Project cards send IDs to 3D scene to highlight nodes
- **System Logs**: HUD reacts to user interactions in real-time
- **Camera Modes**: Smooth transitions between 'home' and 'projects' views

### Visual Logic
- **Home**: Camera zoomed in, terminal hero with typewriter effect
- **Projects**: Camera pulls back, Bento grid slides in, 3D nodes react to hover
- **Neural Pulse**: Every 5 seconds, light travels from core to all project nodes

## Getting Started

**Important:** This project requires Node.js version 20.9.0 or higher.

### Update Node.js

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── projects/
│   │   │   └── page.tsx        # Projects grid
│   │   └── case-study/
│   │       └── [id]/
│   │           └── page.tsx    # Case study pages
│   ├── components/
│   │   ├── NeuralNetwork.tsx   # 3D scene
│   │   └── HUD.tsx             # HUD overlay
│   ├── lib/
│   │   └── projects.ts         # Project data
│   └── types/
│       └── project.ts          # TypeScript types
├── public/
│   └── projects/               # Project images
└── package.json
```

## Customization

1. **Update Personal Info**: Edit `src/components/NeuralNetwork.tsx` to change your name and title
2. **Add Projects**: Modify `src/lib/projects.ts` to add your own projects
3. **Styling**: Customize colors and themes in `src/app/globals.css` and `tailwind.config.js`

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React

## Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT License - feel free to use this template for your own portfolio!
