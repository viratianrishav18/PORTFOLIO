import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroCanvas } from './canvas'

const sectionImages = {
  'Projects': '/projects_preview.png',
  'Experience': '/experience_preview.png',
  'Tech': '/tech_preview.png',
  'Contact': '/contact_preview.png'
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  
  // Interactive Sphere State
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const nameChars = "Rishav".split('')

  return (
    <section id="hero" ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0f',
    }}>
      {/* 3D Background */}
      <HeroCanvas 
        activeSection={activeSection} 
        onJunctionClick={(section) => { 
          setActiveSection(section); 
        }} 
      />

      {/* Ambient gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 70% 30%, rgba(0, 212, 255, 0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Content overlay with parallax */}
      <AnimatePresence>
        {!activeSection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 10, maxWidth: 1280,
              margin: '0 auto', padding: '0 2rem', height: '100%',
              display: 'flex', alignItems: 'center', pointerEvents: 'none',
              transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -5}px)`,
            }}
          >
            <div style={{ maxWidth: 700 }}>
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{
              height: 3,
              background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)',
              borderRadius: 2,
              marginBottom: '1.5rem',
            }}
          />

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              pointerEvents: 'auto',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: '#9d9db5',
              fontWeight: 500,
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Hello, I'm
          </motion.p>

          {/* Name with character stagger */}
          <h1 style={{
            pointerEvents: 'auto',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '1rem',
          }}>
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #c084fc, #8b5cf6, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            style={{
              pointerEvents: 'auto',
              fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
              color: '#9d9db5',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: 540,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            I build{' '}
            <span style={{ color: '#00d4ff', fontWeight: 600 }}>intelligent systems</span>,{' '}
            <span style={{ color: '#22c55e', fontWeight: 600 }}>web applications</span>, and{' '}
          <span style={{ color: '#c084fc', fontWeight: 600 }}>ML-powered solutions</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap', pointerEvents: 'auto' }}
        >
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.85rem 2rem', borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            color: '#fff', fontWeight: 600, fontSize: '0.95rem',
            textDecoration: 'none', transition: 'all 0.3s',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
          }}
          >
            Let's Connect
          </a>
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.85rem 2rem', borderRadius: '0.75rem',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            color: '#c084fc', fontWeight: 600, fontSize: '0.95rem',
            textDecoration: 'none', transition: 'all 0.3s',
          }}
          >
            Explore My Work
          </a>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* Scroll indicator */}
<AnimatePresence>
  {!activeSection && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 2, duration: 0.5 }}
      style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: '0.7rem', color: '#6b6b80', letterSpacing: '0.15em' }}>Scroll</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ width: 1, height: 30, background: 'linear-gradient(180deg, #8b5cf6, transparent)' }} />
    </motion.div>
  )}
</AnimatePresence>

{/* Interactive Section Overlay */}
<AnimatePresence>
  {activeSection && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '550px',
        overflow: 'hidden',
        borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
        zIndex: 50, display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.5)',
      }}
    >
      {/* 
        NO 2D IMAGE HERE!
        The animating 3D glass card from canvas.jsx physically flies to this edge of the screen 
        and acts as the spatial, high-fidelity visual anchor for this viewer.
      */}
      
      {/* Premium Glass & Gradient Shield ONLY - allows the 3D card to shine cleanly behind */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.65) 60%, rgba(10,10,15,0.15) 100%)',
        backdropFilter: 'blur(4px)', // Dialed down blur to clearly perceive the detached 3D element underneath
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <button 
          onClick={() => { setActiveSection(null); }}
          style={{
            alignSelf: 'flex-end', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
            padding: '0.6rem 1.2rem', borderRadius: '2rem', cursor: 'pointer',
            marginBottom: 'auto', transition: 'all 0.3s',
            backdropFilter: 'blur(8px)',
            fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15); e.currentTarget.style.transform = "scale(1.05)"' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05); e.currentTarget.style.transform = "scale(1)"' }}
        >
          Close Viewer
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          style={{ marginTop: 'auto' }}
        >
          <span style={{ color: '#00d4ff', fontSize: '0.9rem', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
            Section Access
          </span>
          <h2 style={{ 
            fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff, #c084fc, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {activeSection}
          </h2>

          <p style={{ color: '#e0e0e5', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem', fontWeight: 300 }}>
            Exploring the visual and technical landscape of my {activeSection.toLowerCase()}. Seamlessly navigate to view the full immersive content.
          </p>

          <a href={`#${activeSection.toLowerCase()}`}
            onClick={() => { setActiveSection(null); }}
            style={{
              display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '3rem',
              background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)',
              color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
              transition: 'all 0.3s', width: '100%', justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)' }}
          >
            Enter {activeSection}
          </a>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  )
}
