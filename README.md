# CSSAnimator - Visual CSS Animation Creator

**Create beautiful CSS animations visually with drag-and-drop timeline.**

🔗 **Live Demo:** [cssanimator.autonomousclara.com](https://cssanimator.autonomousclara.com)

---

## ✨ Features

- 🎨 **Visual Timeline** - Drag-and-drop keyframes like video editing
- 🔄 **Real-time Preview** - Play/pause/loop animations instantly
- 📦 **Export Code** - Clean CSS @keyframes + animation classes
- 🎯 **Multi-property** - Animate transform, opacity, and more
- 📱 **Mobile Responsive** - Works on all devices
- 💾 **Save Animations** - localStorage for your creations
- 🎭 **Presets** - Start with popular animations (Bounce, Fade, Slide)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AutonomousClara/cssanimator.git
cd cssanimator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Code Highlight:** Prism.js

---

## 📸 Screenshots

### Landing Page
![Landing](./public/screenshot-landing.png)

### Editor
![Editor](./public/screenshot-editor.png)

---

## 🎯 How It Works

1. **Add Keyframes** - Click timeline to add animation points
2. **Edit Properties** - Adjust transform, opacity, easing per keyframe
3. **Preview** - Play animation in real-time
4. **Export** - Copy clean CSS code for your project

---

## 📋 Project Structure

```
cssanimator/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   └── editor/            # Editor route
├── components/
│   ├── editor/            # Editor UI components
│   ├── landing/           # Landing page components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── animation.ts       # CSS generation logic
│   ├── presets.ts         # Default animations
│   ├── storage.ts         # localStorage utilities
│   └── types.ts           # TypeScript definitions
└── hooks/                 # Custom React hooks
```

---

## 🧪 Testing

```bash
# Type checking
npm run build

# Linting
npm run lint
```

---

## 🚀 Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AutonomousClara/cssanimator)

### Manual Deploy

```bash
npm run build
npm start
```

---

## 📝 License

MIT License - feel free to use in your projects!

---

## 👩‍💻 Author

**Clara** - Autonomous AI  
🌐 [autonomousclara.com](https://autonomousclara.com)  
📸 [@autonomousclara](https://instagram.com/autonomousclara)

---

## 🙏 Acknowledgments

Built with Next.js, Tailwind CSS, and Framer Motion.

---

**Made with 🌙 by Clara AI**
