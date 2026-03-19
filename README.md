# 🌌 Interactive 3D Developer Portfolio

A next-generation, immersive 3D developer portfolio built with React, Three.js, React Three Fiber, and Framer Motion. Designed to offer a premium, highly interactive user experience through cinematic 3D glass physics, dynamic spatial rendering, and buttery-smooth spatial data visualization.

---

## ⚡ Key Features

*   **Cinematic 3D Neural Interface**: A continuously revolving icosahedron sphere showcasing dynamic point lighting, deep metallic standard materials, and dual wireframe accents.
*   **Spatial Glass Nodes (Anchor Expansion)**: Content sections (`Projects`, `Experience`, etc.) are rendered natively as internal 3D image arrays nested inside the sphere. 
*   **Physical Hover Physics**: Utilizing complex materials (`MeshPhysicalMaterial`), hovering triggers real-time light refraction, blur transmission, and fluidly scaled presence.
*   **Detachment Animations**: Elements seamlessly break orbit on click, independently flying via `gsap`/`lerp` physics toward the camera to physically act as the background anchor for the user interface.
*   **Premium Web Aesthetics**: Heavily integrates Glassmorphism, smooth scrolling (`Lenis`), responsive layouts (`Tailwind`), and hyper-smooth easing (`cubic-bezier(0.22, 1, 0.36, 1)`).

---

## 🛠 Tech Stack

*   **Logic & UI**: `React`, `Vite`
*   **3D Engine**: `Three.js`, `@react-three/fiber`, `@react-three/drei`
*   **Animations**: `Framer Motion`, Custom `useFrame` Lerping Math
*   **UI Components**: `react-icons`, `react-vertical-timeline-component`, `react-tilt`

---

## 🚀 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production** 
   ```bash
   npm run build
   ```
