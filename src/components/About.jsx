import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCpu, FiCode, FiDatabase, FiLayers } from 'react-icons/fi'

const skills = [
  { name: 'Machine Learning', level: 85, color: '#8b5cf6' },
  { name: 'Computer Vision', level: 80, color: '#ec4899' },
  { name: 'React / Next.js', level: 78, color: '#00d4ff' },
  { name: 'Python / TensorFlow', level: 90, color: '#22c55e' },
  { name: 'Backend (Node/FastAPI)', level: 72, color: '#f97316' },
]

const services = [
  { title: 'ML Engineer', icon: FiCpu, color: '#8b5cf6', image: '/projects_preview.png' },
  { title: 'Web Developer', icon: FiCode, color: '#00d4ff', image: '/tech_preview.png' },
  { title: 'Backend Dev', icon: FiDatabase, color: '#22c55e', image: '/experience_preview.png' },
  { title: 'Computer Vision', icon: FiLayers, color: '#ec4899', image: '/contact_preview.png' },
]

function SkillBar({ name, level, color, delay, isInView }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '0.5rem', alignItems: 'center',
      }}>
        <span style={{
          fontSize: '0.85rem', fontWeight: 500, color: '#e0e0f0',
          fontFamily: 'Inter, sans-serif',
        }}>{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          style={{ fontSize: '0.75rem', color: '#6b6b80', fontFamily: 'Inter, sans-serif' }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 12px ${color}40`,
          }}
        />
      </div>
    </div>
  )
}

/* Implementation of the 3D Hover Image Reveal Effect */
function Hover3DReveal({ title, icon: Icon, color, image, delay, isInView }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalize mouse position from -1 to 1 for 3D rotation
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setMouse({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '85px',
        borderRadius: '1rem',
        overflow: 'hidden',
        background: 'rgba(15, 15, 25, 0.4)',
        border: '1px solid rgba(139, 92, 246, 0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        cursor: 'pointer',
        perspective: '1000px', // Anchor the perspective
        transition: 'border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        borderColor: hovered ? color + '50' : 'rgba(139, 92, 246, 0.1)',
        boxShadow: hovered ? `0 10px 30px ${color}15` : 'none',
      }}
    >
      {/* 3D Image Layer (absolute, z-index: 0) */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 1.15,
          filter: hovered ? 'blur(0px)' : 'blur(20px)',
          rotateX: mouse.y * -8, // Tilt mapping
          rotateY: mouse.x * 8,
          y: hovered ? 0 : 20, // Upward momentum reveal
        }}
        transition={{
          type: 'spring', damping: 25, stiffness: 120, mass: 0.8,
          opacity: { duration: 0.3 },
          filter: { duration: 0.3 }
        }}
        style={{
          position: 'absolute',
          inset: -30, // Negative inset to prevent clipping during rotation
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <img 
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Color Bleed & Gradient Shield */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 100%)`,
        }} />
      </motion.div>

      {/* Text Layer (relative, z-index: 10) */}
      <motion.div
        animate={{
          x: hovered ? 10 : 0,
          textShadow: hovered ? `0 0 20px ${color}` : 'none' // Glowing text reaction
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: hovered ? '#fff' : color,
        }}
      >
        <Icon size={26} />
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.02em'
        }}>
          {title}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="section-padding">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-sub-text">Introduction</p>
          <h2 className="section-head-text">About Me.</h2>
        </motion.div>

        {/* Split layout */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Left — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 350 }}>
              {/* Floating Text 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1, y: [0, -10, 0] } : {}}
                transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
                style={{
                  position: 'absolute', top: '15%', left: '-15%', zIndex: 10,
                  background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.6rem 1.2rem',
                  borderRadius: '2rem', color: '#c084fc', fontSize: '0.75rem',
                  fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)',
                }}
              >
                ✦ Creative Developer
              </motion.div>

              {/* Floating Text 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1, y: [0, 10, 0] } : {}}
                transition={{ opacity: { delay: 1, duration: 0.5 }, y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 } }}
                style={{
                  position: 'absolute', bottom: '25%', right: '-10%', zIndex: 10,
                  background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 212, 255, 0.3)', padding: '0.6rem 1.2rem',
                  borderRadius: '2rem', color: '#00d4ff', fontSize: '0.75rem',
                  fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.15)',
                }}
              >
                ⚡ Problem Solver
              </motion.div>

              {/* Image Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(139, 92, 246, 0.08)',
              }}>
                <img
                  src="/rishav-portrait.png"
                  alt="Rishav Kumar"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(transparent, rgba(10, 10, 15, 0.8))',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Service 3D Showcase */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.8rem',
              width: '100%', maxWidth: 350, marginTop: '1rem'
            }}>
              {services.map((s, i) => (
                <Hover3DReveal
                  key={s.title}
                  title={s.title}
                  icon={s.icon}
                  color={s.color}
                  image={s.image}
                  delay={0.6 + i * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p style={{
              color: '#9d9db5',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              fontFamily: 'Inter, sans-serif',
            }}>
              I'm a Computer Science undergraduate at <span style={{ color: '#c084fc', fontWeight: 500 }}>Lovely Professional University</span> with
              a strong passion for <span style={{ color: '#00d4ff', fontWeight: 500 }}>Machine Learning</span>, <span style={{ color: '#ec4899', fontWeight: 500 }}>Computer Vision</span>, and
              full-stack web development. I have hands-on experience building
              real-time fall detection systems, medical image diagnostic tools,
              and intelligent applications using Python, TensorFlow, OpenCV,
              and React. I'm a fast learner who loves creating efficient,
              scalable, and user-friendly solutions that solve real-world problems.
            </p>

            {/* Skill bars */}
            <div>
              <h3 style={{
                fontWeight: 600, color: '#e0e0f0',
                marginBottom: '1.5rem', letterSpacing: '0.05em',
                textTransform: 'uppercase', fontSize: '0.8rem',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                Core Skills
              </h3>
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={0.5 + i * 0.12}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
