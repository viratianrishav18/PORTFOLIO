import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'work', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = navLinks.find(l => l.id === entry.target.id)
            if (link) setActive(link.title)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: scrolled ? '0.6rem 2rem' : '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139, 92, 246, 0.08)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 1280, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" onClick={() => { setActive(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.85rem', color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          }}>RK</div>
          <span style={{
            color: '#fff', fontWeight: 700, fontSize: '1.1rem',
            letterSpacing: '-0.01em',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Rishav <span style={{ color: '#8b5cf6' }}>Kumar</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.title ? 'active' : ''}`}
              onClick={() => setActive(link.title)}
            >
              {link.title}
            </a>
          ))}
          <a href="/Rishav_Kumar_CV.pdf" download style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1.2rem', borderRadius: '0.6rem',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            color: '#fff', fontWeight: 600, fontSize: '0.85rem',
            textDecoration: 'none', transition: 'all 0.3s',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 2px 15px rgba(139, 92, 246, 0.25)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(139, 92, 246, 0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 2px 15px rgba(139, 92, 246, 0.25)'
            }}
          >
            <FiDownload size={14} /> Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setToggle(!toggle)} className="nav-mobile-btn"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: '#fff', cursor: 'pointer', fontSize: '1.5rem',
            padding: '0.25rem',
          }}>
          {toggle ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '100%', right: '1rem', left: '1rem',
              background: 'rgba(15, 15, 25, 0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '1rem', padding: '1.5rem',
              display: 'flex', flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(139,92,246,0.1)',
            }}>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setActive(link.title); setToggle(false) }}
                style={{
                  color: active === link.title ? '#fff' : '#9d9db5',
                  fontSize: '1rem', fontWeight: 500, textDecoration: 'none',
                  padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                  transition: 'background 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{link.title}</motion.a>
            ))}
            <a href="/Rishav_Kumar_CV.pdf" download style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.65rem 1rem', borderRadius: '0.6rem',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff', fontWeight: 600,
              fontSize: '0.85rem', textDecoration: 'none',
              marginTop: '0.25rem',
            }}>
              <FiDownload size={14} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
