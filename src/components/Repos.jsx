import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi'

export default function Repos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    fetch('https://api.github.com/users/viratianrishav18/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork).slice(0, 6))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const langColors = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'Jupyter Notebook': '#DA5B0B',
  }

  return (
    <section ref={ref} className="section-padding" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-sub-text">Open Source</p>
          <h2 className="section-head-text">GitHub Repositories.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '1rem', color: '#9d9db5',
            fontSize: '1.05rem', maxWidth: 700,
            lineHeight: 1.8, marginBottom: '2rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Live from GitHub — my latest repositories and ongoing work.
        </motion.p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="loader-bar-track" style={{ width: 120 }}>
              <div className="loader-bar-fill" />
            </div>
          </div>
        ) : repos.length === 0 ? (
          <p style={{ color: '#9d9db5', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
            No repositories found. Check back later!
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem',
          }}>
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="repo-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <FiGithub size={18} color="#8b5cf6" />
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 700, color: '#f0f0f5',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    flex: 1,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {repo.name}
                  </h3>
                  <FiExternalLink size={14} color="#6b6b80" />
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.83rem', color: '#9d9db5', lineHeight: 1.6,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: '2.7em',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {repo.description || 'No description provided.'}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  fontSize: '0.78rem', color: '#6b6b80',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {repo.language && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: langColors[repo.language] || '#9d9db5',
                        display: 'inline-block',
                        boxShadow: `0 0 6px ${langColors[repo.language] || '#9d9db5'}40`,
                      }} />
                      {repo.language}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiStar size={13} /> {repo.stargazers_count}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiGitBranch size={13} /> {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <a
            href="https://github.com/viratianrishav18?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.7rem 1.5rem', borderRadius: '0.75rem',
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              color: '#c084fc', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.3s',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <FiGithub size={16} /> View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  )
}
