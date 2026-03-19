import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

const links = [
  { icon: FiGithub, href: 'https://github.com/viratianrishav18', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/rishav-kumar-671715330', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:rishavwork18@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(139, 92, 246, 0.08)',
      padding: '2.5rem 2rem',
      background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.02))',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Social links */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {links.map(link => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                style={{
                  width: 42, height: 42, borderRadius: '0.75rem',
                  background: 'rgba(139, 92, 246, 0.06)',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6b6b80', textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#f0f0f5'
                  e.currentTarget.style.borderColor = '#8b5cf6'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.2)'
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b6b80'
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.06)'
                }}
              >
                <Icon size={17} />
              </a>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{
          width: 40, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
        }} />

        {/* Copyright */}
        <p style={{
          fontSize: '0.78rem', color: '#6b6b80',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          fontFamily: 'Inter, sans-serif',
        }}>
          © {new Date().getFullYear()} Rishav Kumar · Built with{' '}
          <FiHeart size={11} color="#8b5cf6" style={{ margin: '0 2px' }} /> React & Three.js
        </p>
      </div>
    </footer>
  )
}
