import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { EarthCanvas } from './canvas'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [website, setWebsite] = useState('')
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Required'
    else if (form.message.trim().length < 8) e.message = 'Please write a little more detail'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setSending(true)
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        website,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({ ok: false }))
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setWebsite('')
      setTimeout(() => setSent(false), 4000)
    } catch (error) {
      setSending(false)
      setSubmitError(error?.message || 'Message could not be sent right now. Please try again in a moment.')
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '1rem 1.25rem',
    paddingTop: form[field] || focused === field ? '1.5rem' : '1rem',
    borderRadius: '0.75rem',
    background: 'rgba(26, 26, 40, 0.6)',
    border: `1px solid ${focused === field ? '#8b5cf6' : errors[field] ? '#ef4444' : 'rgba(139, 92, 246, 0.1)'}`,
    outline: 'none',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 400,
    transition: 'all 0.3s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(139, 92, 246, 0.12), 0 0 20px rgba(139, 92, 246, 0.05)' : 'none',
  })

  const labelStyle = (field) => ({
    position: 'absolute',
    left: '1.25rem',
    top: form[field] || focused === field ? '0.5rem' : '1rem',
    fontSize: form[field] || focused === field ? '0.65rem' : '0.9rem',
    color: focused === field ? '#8b5cf6' : '#6b6b80',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    pointerEvents: 'none',
    letterSpacing: form[field] || focused === field ? '0.05em' : '0',
    textTransform: form[field] || focused === field ? 'uppercase' : 'none',
    fontFamily: 'Inter, sans-serif',
  })

  return (
    <section id="contact" ref={ref} className="section-padding" style={{
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-strong"
          style={{ padding: '2.5rem' }}
        >
          <p className="section-sub-text">Get in touch</p>
          <h2 className="section-head-text" style={{ marginBottom: '0.5rem' }}>Contact.</h2>
          <p style={{
            color: '#6b6b80', fontSize: '0.9rem', marginBottom: '2rem',
            fontFamily: 'Inter, sans-serif',
          }}>
            Have an idea? Let's make it happen.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}>
            {/* Name */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle('name')}>Your Name</label>
              <input
                type="text"
                style={inputStyle('name')}
                value={form.name}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.3rem', fontFamily: 'Inter, sans-serif' }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle('email')}>Your Email</label>
              <input
                type="email"
                style={inputStyle('email')}
                value={form.email}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.3rem', fontFamily: 'Inter, sans-serif' }}>{errors.email}</p>}
            </div>

            {/* Message */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle('message')}>Your Message</label>
              <textarea
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 140 }}
                value={form.message}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={5}
              />
              {errors.message && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.3rem', fontFamily: 'Inter, sans-serif' }}>{errors.message}</p>}
            </div>

            {/* Honeypot field for bot detection */}
            <input
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              style={{
                position: 'absolute',
                left: '-10000px',
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: 'none',
              }}
            />

            <button
              type="submit"
              disabled={sending}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                borderRadius: '0.75rem',
                background: sent ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                border: 'none', cursor: sending ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                width: 'fit-content',
                fontFamily: 'Inter, sans-serif',
                boxShadow: sent ? '0 4px 20px rgba(34, 197, 94, 0.3)' : '0 4px 20px rgba(139, 92, 246, 0.3)',
                opacity: 1,
              }}
              onMouseEnter={e => { if (!sending && !sent) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              {sent ? '✓ Message Sent!' : sending ? 'Sending...' : <>Let's build something insane <FiArrowUpRight size={16} /></>}
            </button>

            {submitError && (
              <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '-0.5rem', fontFamily: 'Inter, sans-serif' }}>
                {submitError}
              </p>
            )}
          </form>
        </motion.div>

        {/* Earth 3D */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ height: 500, minHeight: 400 }}
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </section>
  )
}
