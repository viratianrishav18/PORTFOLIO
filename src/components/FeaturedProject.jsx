import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiGithub } from 'react-icons/fi'

export default function FeaturedProject() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="featured-bg" style={{
      position: 'relative', overflow: 'hidden',
      padding: '6rem 2rem',
    }}>
      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p className="section-sub-text">Spotlight</p>
          <h2 className="section-head-text">Featured Project.</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.1)',
            }}>
              <img
                src="/fall_detector.png"
                alt="Fall Detection System"
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(0, 212, 255, 0.05) 100%)',
                pointerEvents: 'none',
              }} />
            </div>
          </motion.div>

          {/* Content side — storytelling */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                borderRadius: '2rem',
                background: 'rgba(236, 72, 153, 0.1)',
                border: '1px solid rgba(236, 72, 153, 0.2)',
                color: '#ec4899',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Computer Vision • Real-time
            </motion.span>

            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#f0f0f5',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Fall Detection System
            </h3>

            {/* Story sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{
                  fontSize: '0.8rem', fontWeight: 600, color: '#8b5cf6',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>The Problem</h4>
                <p style={{
                  color: '#9d9db5', fontSize: '0.92rem', lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Falls are a leading cause of injury, especially among the elderly.
                  Existing systems rely on wearable devices that are often forgotten or uncomfortable.
                </p>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.8rem', fontWeight: 600, color: '#00d4ff',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>The Solution</h4>
                <p style={{
                  color: '#9d9db5', fontSize: '0.92rem', lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  A camera-based system using MediaPipe pose estimation and custom ML
                  classifiers to detect falls in real-time without any wearable hardware.
                </p>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.8rem', fontWeight: 600, color: '#22c55e',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>The Impact</h4>
                <p style={{
                  color: '#9d9db5', fontSize: '0.92rem', lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  High-accuracy detection with automated alert notifications,
                  enabling immediate response during critical incidents.
                </p>
              </div>
            </div>

            {/* Tech stack */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
              marginTop: '1.5rem',
            }}>
              {['Python', 'OpenCV', 'MediaPipe', 'TensorFlow'].map(tech => (
                <span key={tech} style={{
                  padding: '0.3rem 0.75rem', borderRadius: '2rem',
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  color: '#c084fc', fontSize: '0.72rem', fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="https://github.com/viratianrishav18"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '2rem', padding: '0.85rem 1.75rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.3)'
              }}
            >
              <FiGithub size={16} /> View on GitHub <FiArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
