import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const technologies = [
  { name: 'C++', color: '#8b5cf6', icon: '⚡' },
  { name: 'Java', color: '#f97316', icon: '☕' },
  { name: 'Python', color: '#22c55e', icon: '🐍' },
  { name: 'React', color: '#00d4ff', icon: '⚛' },
  { name: 'Node.js', color: '#22c55e', icon: '🟢' },
  { name: 'TensorFlow', color: '#f97316', icon: '🧠' },
  { name: 'OpenCV', color: '#00d4ff', icon: '👁' },
  { name: 'FastAPI', color: '#22c55e', icon: '🚀' },
  { name: 'MongoDB', color: '#22c55e', icon: '🍃' },
  { name: 'MySQL', color: '#00d4ff', icon: '🗄' },
  { name: 'Tailwind', color: '#00d4ff', icon: '🎨' },
  { name: 'Git', color: '#f97316', icon: '📦' },
  { name: 'Scikit', color: '#8b5cf6', icon: '📊' },
  { name: 'HTML', color: '#f97316', icon: '🌐' },
  { name: 'CSS', color: '#00d4ff', icon: '✨' },
]

export default function Tech() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <p className="section-sub-text">What I work with</p>
          <h2 className="section-head-text">Technologies.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '1rem',
            color: '#9d9db5',
            fontSize: '1rem',
            maxWidth: 600,
            lineHeight: 1.7,
            textAlign: 'center',
            margin: '1rem auto 0',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          The tools and technologies I use to bring ideas to life.
        </motion.p>

        {/* Interactive tech grid */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '1rem',
          maxWidth: 900,
          margin: '3rem auto 0',
        }}>
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.3 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="tech-grid-item"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = tech.color + '40'
                e.currentTarget.style.boxShadow = `0 8px 30px ${tech.color}15, inset 0 0 30px ${tech.color}05`
                e.currentTarget.querySelector('.tech-icon').style.transform = 'scale(1.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.12)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.querySelector('.tech-icon').style.transform = 'scale(1)'
              }}
            >
              <span className="tech-icon" style={{
                fontSize: '1.6rem',
                transition: 'transform 0.3s ease',
                display: 'block',
              }}>
                {tech.icon}
              </span>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: tech.color,
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
              }}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
