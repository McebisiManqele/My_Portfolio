# Quick Customization Guide

## 🎯 Essential Customizations

### 1. Update Your Personal Information

**File:** `src/components/NeuralNetwork.tsx`

```typescript
// Line 58-60: Change your name and title
<h1 className="text-6xl md:text-8xl font-bold font-orbitron text-white mb-4 tracking-wider">
  YOUR NAME  // ← Change this
</h1>
<p className="text-xl md:text-2xl text-cyan-400 font-mono mb-2">
  FULL-STACK ARCHITECT  // ← Change this
</p>
```

### 2. Add Your Projects

**File:** `src/lib/projects.ts`

Replace the example projects with your own:

```typescript
{
  id: "your-project-id",           // Unique ID (lowercase, hyphens)
  title: "Your Project Name",      // Display name
  headline: "Short Description",   // One-liner
  summary: "Brief overview...",    // 1-2 sentences
  problem: "What problem...",      // The challenge
  solution: "How you solved...",   // Your approach
  technicalChallenge: "Deep dive...", // Technical details
  stack: ["React", "Node.js"],     // Technologies used
  image: "/projects/your-img.jpg", // Project image
  liveUrl: "https://...",          // Optional: Live demo
  repoUrl: "https://github.com/...", // Optional: GitHub
  coordinates: { x: 15, y: 5, z: 0 }, // 3D position
  color: "#00ffff"                 // Theme color (hex)
}
```

### 3. Customize Colors

**File:** `src/app/globals.css`

```css
/* Change primary accent color */
--accent-color: #00ffcc;  /* Cyan - change to your preference */

/* Available color schemes: */
/* Cyan: #00ffcc */
/* Purple: #a855f7 */
/* Blue: #3b82f6 */
/* Green: #10b981 */
/* Red: #ef4444 */
```

### 4. Add Project Images

Place your project images in: `public/projects/`

Recommended size: 1920x1080px (16:9 ratio)

## 📁 File Structure Reference

```
src/
├── app/
│   ├── layout.tsx              # Site-wide layout & metadata
│   ├── page.tsx                # Landing page (3D scene)
│   ├── projects/page.tsx       # Projects grid
│   └── case-study/[id]/page.tsx # Individual project pages
├── components/
│   ├── NeuralNetwork.tsx       # 3D landing animation
│   └── HUD.tsx                 # Heads-up display overlay
├── lib/
│   └── projects.ts             # ⭐ Your project data
└── types/
    └── project.ts              # TypeScript interfaces
```

## 🎨 Styling Tips

### Change Font
Edit `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', monospace;
}
```

### Adjust Animations
Edit animation speeds in components:
- `NeuralNetwork.tsx`: Canvas animation speed
- `HUD.tsx`: Log animation timing
- `globals.css`: CSS animation durations

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`

### Custom Server
```bash
npm run build
npm start
```

## 📝 Content Writing Tips

### Project Descriptions (STAR Method)
- **Situation**: What was the problem/context?
- **Task**: What needed to be done?
- **Action**: What did YOU do specifically?
- **Result**: What was the measurable outcome?

### Good Example:
```
Problem: "E-commerce site crashed during Black Friday, losing $50K/hour"
Solution: "Implemented Redis caching and load balancing"
Technical: "Reduced database queries by 80%, handled 10x traffic"
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
# Regenerate types
npm run dev
# Check tsconfig.json paths
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

Need help? Check the README.md or create an issue on GitHub!
