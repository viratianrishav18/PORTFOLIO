import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Tech from './components/Tech'
import Projects from './components/Projects'
import FeaturedProject from './components/FeaturedProject'
import Repos from './components/Repos'
import Contact from './components/Contact'
import Footer from './components/Footer'

/* ============== CINEMATIC LOADER ============== */
function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING BOOT SEQUENCE...')

  const texts = [
    'INITIALIZING BOOT SEQUENCE...',
    'ESTABLISHING SECURE CONNECTION...',
    'LOADING NEURAL MESH...',
    'CALIBRATING 3D ENVIRONMENT...',
    'RENDERING USER INTERFACE...',
    'ACCESS GRANTED.'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoadingText(texts[texts.length - 1])
          setTimeout(onFinish, 800)
          return 100
        }
        const newProgress = prev + Math.random() * 8 + 2
        
        const textIndex = Math.floor((newProgress / 100) * (texts.length - 1))
        setLoadingText(texts[Math.min(textIndex, texts.length - 2)])
        
        return newProgress
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <motion.div
      className="loader-wrapper"
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0f', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Top Corner RK Logo */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        style={{ 
          position: 'absolute', top: '2rem', left: '2.5rem', 
          fontSize: '1.5rem', fontWeight: 800, 
          fontFamily: "'Space Grotesk', sans-serif", 
          color: '#f0f0f5', letterSpacing: '-0.05em' 
        }}
      >
        R<span style={{ color: '#8b5cf6' }}>K</span>.
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 400, padding: '0 2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{
            color: '#00d4ff', fontSize: '0.75rem', fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.1em', fontWeight: 600
          }}>
            SYSTEM.BOOT
          </span>
          <span style={{
            color: '#8b5cf6', fontSize: '0.75rem', fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontVariantNumeric: 'tabular-nums'
          }}>
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: 2, background: 'rgba(139, 92, 246, 0.15)',
          position: 'relative', overflow: 'hidden'
        }}>
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)',
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear', duration: 0.15 }}
          />
        </div>

        {/* Loading text log */}
        <div style={{
          marginTop: '1.5rem', height: 20, display: 'flex', alignItems: 'center'
        }}>
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: '#6b6b80', fontSize: '0.7rem',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.05em', margin: 0
            }}
          >
            {'>'} {loadingText}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============== SECTION DIVIDER ============== */
function Divider() {
  return <div className="section-divider" />
}

/* ============== APP ============== */
function App() {
  const [loading, setLoading] = useState(true)

  // Init Lenis smooth scroll
  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 0 }}
        >
          {/* Global ambient background */}
          <div className="hero-pattern" style={{
            position: 'fixed', inset: 0, zIndex: 0,
            pointerEvents: 'none',
          }} />

          <Navbar />
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Experience />
          <Divider />
          <Tech />
          <Divider />
          <Projects />
          <Divider />
          <FeaturedProject />
          <Divider />
          <Repos />
          <Divider />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
