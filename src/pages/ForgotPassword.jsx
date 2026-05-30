import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')
        
        try {
            const res = await axios.post('/api/users/forgot-password', { email })
            setMessage(res.data.message || "Reset link sent to your email!")
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.blobBlue} />
            <div style={styles.blobPurple} />

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <h1 style={styles.title}>Reset Password</h1>
                    <p style={styles.subtitle}>
                        Enter your email address and we'll send you a secure link to reset your password.
                    </p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={styles.errorBox}>
                            {error}
                        </motion.div>
                    )}
                    {message && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={styles.successBox}>
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={e => Object.assign(e.target.style, styles.inputBlur)}
                        />
                    </div>

                    <motion.button
                        whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 32px rgba(99,102,241,0.5)' } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
                    >
                        {loading ? "Sending link..." : "Send Reset Link"}
                    </motion.button>
                </form>

                <p style={styles.footerText}>
                    Remember your password? <Link to="/login" style={styles.footerLink}>Back to Sign In</Link>
                </p>
            </motion.div>
        </div>
    )
}

/* Reuse your existing beautiful layout styles */
const styles = {
    page: { minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at 20% 50%, #0f0c29 0%, #1a1040 40%, #0d0d1a 100%)', fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden', padding: '24px', boxSizing: 'border-box' },
    blobBlue: { position: 'absolute', top: '10%', left: '5%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' },
    blobPurple: { position: 'absolute', bottom: '15%', right: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' },
    card: { width: '100%', maxWidth: '480px', background: 'rgba(15, 12, 41, 0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1, boxSizing: 'border-box' },
    header: { textAlign: 'center', marginBottom: '24px' },
    title: { fontSize: '26px', fontWeight: '700', color: '#e2e8f0', margin: '0 0 10px' },
    subtitle: { fontSize: '13.5px', color: 'rgba(148,163,184,0.85)', lineHeight: 1.6, margin: 0 },
    errorBox: { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fca5a5', fontSize: '13px', marginBottom: '16px', textAlign: 'center' },
    successBox: { background: 'rgba(52,168,83,0.12)', border: '1px solid rgba(52,168,83,0.3)', borderRadius: '10px', padding: '10px 14px', color: '#a7f3d0', fontSize: '13px', marginBottom: '16px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    label: { display: 'block', fontSize: '13.5px', fontWeight: '500', color: 'rgba(203,213,225,0.9)', marginBottom: '7px' },
    input: { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: '14.5px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' },
    inputFocus: { borderColor: 'rgba(99,102,241,0.6)', background: 'rgba(99,102,241,0.06)' },
    inputBlur: { borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' },
    submitBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' },
    submitBtnDisabled: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.05)' },
    footerText: { textAlign: 'center', marginTop: '24px', fontSize: '13.5px', color: 'rgba(148,163,184,0.7)' },
    footerLink: { color: '#818cf8', fontWeight: '600', textDecoration: 'none' }
}

export default ForgotPassword