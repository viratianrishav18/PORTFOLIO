import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBookOpen, FiAward, FiBriefcase, FiCode, FiExternalLink } from 'react-icons/fi'

const experiences = [
  {
    title: 'B.Tech — Computer Science & Engineering',
    company: 'Lovely Professional University',
    date: 'Aug 2023 – Present',
    icon: FiBookOpen,
    iconBg: '#8b5cf6',
    points: [
      'CGPA: 7.0 — Focused on ML, Data Science, and Software Engineering.',
      'Completed 20+ academic projects in programming and data analysis.',
      'Active in coding competitions across multiple platforms.',
    ],
  },
  {
    title: 'Machine Learning Training',
    company: 'LPU, Punjab',
    date: 'Jul 2025 – Aug 2025',
    icon: FiBriefcase,
    iconBg: '#00d4ff',
    certLink: '#',
    points: [
      'Hands-on Machine Learning training focused on core algorithms and data preprocessing.',
      'Built a real-time Fall Detection system using pose estimation.',
      'Worked with model deployment and real-time prediction workflows.',
    ],
  },
  {
    title: 'Data Science with Gen AI',
    company: 'Physics Wallah',
    date: 'Sep 2024 – May 2025',
    icon: FiAward,
    iconBg: '#22c55e',
    certLink: '#',
    points: [
      'Comprehensive program covering Python, Statistics, ML, and Generative AI.',
      'Hands-on projects with real-world datasets and model evaluation.',
    ],
  },
  {
    title: 'Machine Learning Certification',
    company: 'iamneo Platform',
    date: 'Oct 2024 – Nov 2025',
    icon: FiAward,
    iconBg: '#ec4899',
    certLink: '#',
    points: [
      'Deep dive into supervised/unsupervised learning algorithms.',
      'Model evaluation, cross-validation, and deployment strategies.',
    ],
  },
  {
    title: 'Master Generative AI & Tools',
    company: 'Infosys',
    date: 'Aug 2025 – Sep 2025',
    icon: FiAward,
    iconBg: '#f97316',
    certLink: '#',
    points: [
      'Advanced course on ChatGPT, prompt engineering, and generative AI applications.',
      'Explored practical enterprise use cases for AI tools.',
    ],
  },
  {
    title: '200+ Coding Problems Solved',
    company: 'LeetCode, GFG, HackerRank, CodeChef',
    date: 'Nov 2025',
    icon: FiCode,
    iconBg: '#8b5cf6',
    points: [
      'Consistent problem-solving practice across multiple competitive programming platforms.',
      'Strengthened DSA and algorithmic thinking skills.',
    ],
  },
]

function TimelineCard({ exp, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = exp.icon
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      width: '100%',
      position: 'relative',
      marginBottom: '2rem',
    }}>
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 20,
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${exp.iconBg}, ${exp.iconBg}cc)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: `0 0 20px ${exp.iconBg}40`,
          border: '3px solid rgba(10, 10, 15, 0.8)',
        }}
        className="timeline-dot"
      >
        <Icon size={16} color="#fff" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card"
        style={{
          width: 'calc(50% - 50px)',
          padding: '1.5rem',
          position: 'relative',
          borderLeft: `3px solid ${exp.iconBg}30`,
        }}
        onMouseEnter={e => e.currentTarget.style.borderLeftColor = exp.iconBg + '80'}
        onMouseLeave={e => e.currentTarget.style.borderLeftColor = exp.iconBg + '30'}
      >
        <span style={{
          fontSize: '0.75rem', color: '#6b6b80', fontWeight: 500,
          fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em',
        }}>
          {exp.date}
        </span>
        <h3 style={{
          fontSize: '1.05rem', fontWeight: 700, color: '#f0f0f5',
          marginTop: '0.3rem',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {exp.title}
        </h3>
        <p style={{
          fontSize: '0.82rem', fontWeight: 500, color: exp.iconBg,
          marginTop: '0.15rem',
          fontFamily: 'Inter, sans-serif',
        }}>
          {exp.company}
        </p>
        <ul style={{
          marginTop: '0.75rem', listStyle: 'none', paddingLeft: 0,
          display: 'flex', flexDirection: 'column', gap: '0.4rem',
        }}>
          {exp.points.map((point, i) => (
            <li key={i} style={{
              color: '#9d9db5', fontSize: '0.8rem', lineHeight: 1.6,
              paddingLeft: '1rem', position: 'relative',
              fontFamily: 'Inter, sans-serif',
            }}>
              <span style={{
                position: 'absolute', left: 0, top: '0.55em',
                width: 4, height: 4, borderRadius: '50%',
                background: exp.iconBg + '60',
              }} />
              {point}
            </li>
          ))}
        </ul>
        {exp.certLink && (
          <a
            href={exp.certLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '1.2rem', padding: '0.4rem 1rem',
              borderRadius: '2rem', background: exp.iconBg + '15',
              color: exp.iconBg, fontSize: '0.75rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s',
              border: `1px solid ${exp.iconBg}30`,
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.background = exp.iconBg + '30'; 
              e.currentTarget.style.borderColor = exp.iconBg + '60' 
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.background = exp.iconBg + '15'; 
              e.currentTarget.style.borderColor = exp.iconBg + '30' 
            }}
          >
            <FiExternalLink size={14} /> View Credential
          </a>
        )}
      </motion.div>
    </div>
  )
}

/* Mobile timeline card */
function MobileTimelineCard({ exp, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const Icon = exp.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        position: 'relative',
      }}
    >
      {/* Line + dot */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: `linear-gradient(135deg, ${exp.iconBg}, ${exp.iconBg}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 15px ${exp.iconBg}30`,
          zIndex: 2,
        }}>
          <Icon size={14} color="#fff" />
        </div>
        <div style={{
          width: 2, flex: 1,
          background: `linear-gradient(180deg, ${exp.iconBg}30, transparent)`,
        }} />
      </div>

      {/* Card */}
      <div className="glass-card" style={{
        padding: '1.25rem', flex: 1,
        borderLeft: `3px solid ${exp.iconBg}30`,
      }}>
        <span style={{ fontSize: '0.72rem', color: '#6b6b80', fontFamily: 'Inter, sans-serif' }}>{exp.date}</span>
        <h3 style={{
          fontSize: '0.95rem', fontWeight: 700, color: '#f0f0f5',
          marginTop: '0.2rem',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>{exp.title}</h3>
        <p style={{
          fontSize: '0.78rem', color: exp.iconBg,
          fontWeight: 500, marginTop: '0.1rem',
          fontFamily: 'Inter, sans-serif',
        }}>{exp.company}</p>
        <ul style={{
          marginTop: '0.5rem', listStyle: 'none', paddingLeft: 0,
          display: 'flex', flexDirection: 'column', gap: '0.3rem',
        }}>
          {exp.points.map((p, i) => (
            <li key={i} style={{
              color: '#9d9db5', fontSize: '0.76rem', lineHeight: 1.5,
              paddingLeft: '0.75rem', position: 'relative',
              fontFamily: 'Inter, sans-serif',
            }}>
              <span style={{
                position: 'absolute', left: 0, top: '0.5em',
                width: 3, height: 3, borderRadius: '50%',
                background: exp.iconBg + '50',
              }} />
              {p}
            </li>
          ))}
        </ul>
        {exp.certLink && (
          <a
            href={exp.certLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              marginTop: '1rem', padding: '0.35rem 0.8rem',
              borderRadius: '2rem', background: exp.iconBg + '15',
              color: exp.iconBg, fontSize: '0.7rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s',
              border: `1px solid ${exp.iconBg}30`,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <FiExternalLink size={12} /> View Credential
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="work" className="section-padding" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-sub-text">What I have done so far</p>
          <h2 className="section-head-text">Experience & Education.</h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="desktop-timeline" style={{
          marginTop: '3rem', position: 'relative',
        }}>
          {/* Center line */}
          <div className="timeline-line" />
          
          {experiences.map((exp, i) => (
            <TimelineCard key={i} exp={exp} index={i} />
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="mobile-timeline" style={{
          marginTop: '2rem', display: 'none',
        }}>
          {experiences.map((exp, i) => (
            <MobileTimelineCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
