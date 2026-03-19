import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    name: 'Fall Detection System',
    description:
      'Built a real-time fall-detection system using computer vision to identify human falls with high accuracy. Integrated automated alert notifications to ensure immediate response during critical incidents.',
    tags: [
      { name: 'Python', color: '#22c55e' },
      { name: 'OpenCV', color: '#00d4ff' },
      { name: 'MediaPipe', color: '#ec4899' },
    ],
    image: '/fall_detector.png',
    source_code_link: 'https://github.com/viratianrishav18',
  },
  {
    name: 'Lung Disease Detection',
    description:
      'Developed an ML-based Lung Disease Detection system capable of analyzing medical images to identify early signs of respiratory disorders with high accuracy using advanced preprocessing and classification.',
    tags: [
      { name: 'TensorFlow', color: '#f97316' },
      { name: 'Python', color: '#22c55e' },
      { name: 'OpenCV', color: '#00d4ff' },
    ],
    image: '/lung_diagnostic.png',
    source_code_link: 'https://github.com/viratianrishav18',
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: 420 }}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        scale={1.02}
        transitionSpeed={400}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareBorderRadius="1.25rem"
      >
        <div className="glass-card" style={{
          padding: '1.25rem',
          overflow: 'hidden',
        }}>
          {/* Image */}
          <div className="project-card-img-wrapper" style={{
            borderRadius: '0.75rem',
          }}>
            <img src={project.image} alt={project.name} loading="lazy" />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(10, 10, 15, 0.85) 100%)',
              opacity: 0, transition: 'opacity 0.4s',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              padding: '1rem',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1rem', borderRadius: '0.5rem',
                  background: 'rgba(139, 92, 246, 0.9)',
                  color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <FiGithub size={14} /> View Code
              </a>
            </div>
            {/* GitHub button */}
            <div style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              display: 'flex', gap: '0.5rem',
            }}>
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(10, 10, 15, 0.7)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', transition: 'all 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#8b5cf6'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(10, 10, 15, 0.7)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <FiGithub size={16} />
              </a>
            </div>
          </div>

          {/* Info */}
          <div style={{ marginTop: '1.25rem' }}>
            <h3 style={{
              fontSize: '1.25rem', fontWeight: 700, color: '#f0f0f5',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {project.name}
            </h3>
            <p style={{
              marginTop: '0.6rem', color: '#9d9db5', fontSize: '0.85rem',
              lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
            }}>
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{
            marginTop: '1.25rem',
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          }}>
            {project.tags.map(tag => (
              <span key={tag.name} style={{
                fontSize: '0.72rem', fontWeight: 600,
                padding: '0.3rem 0.75rem',
                borderRadius: '2rem',
                background: tag.color + '10',
                border: `1px solid ${tag.color}25`,
                color: tag.color,
                fontFamily: 'Inter, sans-serif',
              }}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="section-padding" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-sub-text">My work</p>
          <h2 className="section-head-text">Projects.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '1rem', color: '#9d9db5',
            fontSize: '1.05rem', maxWidth: 700,
            lineHeight: 1.8, fontFamily: 'Inter, sans-serif',
          }}
        >
          Real-world projects that showcase my ability to solve complex problems
          across machine learning, computer vision, and web development.
        </motion.p>

        <div style={{
          marginTop: '3rem',
          display: 'flex', flexWrap: 'wrap',
          gap: '2rem', justifyContent: 'center',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
