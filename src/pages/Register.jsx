import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Register = ({ setUser }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ username: "", email: "", password: "" })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            console.log("Attempting registration with:", formData.email)
            const res = await axios.post('/api/users/register', formData)
            console.log("Register response:", res.data)
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                setUser(res.data)
                navigate('/')
            } else {
                setError("No token received")
            }
        } catch (err) {
            console.error("Register error:", err.response?.data || err.message)
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            {/* Animated background blobs */}
            <div style={styles.blobBlue} />
            <div style={styles.blobPurple} />
            <div style={styles.blobIndigo} />

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={styles.card}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                    style={styles.header}
                >
                    <h1 style={styles.title}>Create Your Account</h1>
                    <p style={styles.subtitle}>
                        Join a smarter way of managing tasks and products. Get started
                        in seconds and unlock your full workflow potential.
                    </p>
                </motion.div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={styles.errorBox}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Google Button - Converted to clean anchor link */}
                <motion.a
                    href="http://localhost:5000/api/users/google"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={styles.googleBtn}
                >
                    <GoogleIcon />
                    Sign up with Google
                </motion.a>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={styles.divider}
                >
                    <div style={styles.dividerLine} />
                    <span style={styles.dividerText}>Or</span>
                    <div style={styles.dividerLine} />
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.32, duration: 0.4 }}
                    >
                        <label style={styles.label}>Username</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter your username"
                            style={styles.input}
                            onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={e => Object.assign(e.target.style, styles.inputBlur)}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.38, duration: 0.4 }}
                    >
                        <label style={styles.label}>Email</label>
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            style={styles.input}
                            onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={e => Object.assign(e.target.style, styles.inputBlur)}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.44, duration: 0.4 }}
                        style={{ position: 'relative' }}
                    >
                        <label style={styles.label}>Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            style={styles.input}
                            onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={e => Object.assign(e.target.style, styles.inputBlur)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={styles.eyeBtn}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.52, duration: 0.4 }}
                        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(99,102,241,0.5)' }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
                    >
                        {loading ? (
                            <span style={styles.loadingRow}>
                                <Spinner /> Creating account...
                            </span>
                        ) : "Create Account"}
                    </motion.button>
                </form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={styles.footerText}
                >
                    Already have an account?{' '}
                    <Link to="/login" style={styles.footerLink}>Sign In</Link>
                </motion.p>
            </motion.div>
        </div>
    )
}

/* ── Icons ── */
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
)

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
)

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
)

const Spinner = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ animation: 'spin 0.8s linear infinite' }}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
)

/* ── Styles ── */
const styles = {
    page: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 20% 50%, #0f0c29 0%, #1a1040 40%, #0d0d1a 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '24px',
        boxSizing: 'border-box'
    },
    blobBlue: {
        position: 'absolute', top: '10%', left: '5%',
        width: '340px', height: '340px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
    },
    blobPurple: {
        position: 'absolute', bottom: '15%', right: '8%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
    },
    blobIndigo: {
        position: 'absolute', top: '60%', left: '50%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
    },
    card: {
        width: '100%',
        maxWidth: '560px',
        background: 'rgba(15, 12, 41, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '44px 40px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '28px' },
    title: {
        fontSize: '28px', fontWeight: '700', color: '#e2e8f0',
        margin: '0 0 12px', letterSpacing: '-0.3px', lineHeight: 1.2,
    },
    subtitle: {
        fontSize: '13.5px', color: 'rgba(148,163,184,0.85)', lineHeight: 1.6,
        margin: 0, maxWidth: '400px', marginInline: 'auto',
    },
    errorBox: {
        background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '10px', padding: '10px 14px', color: '#fca5a5',
        fontSize: '13px', marginBottom: '16px', textAlign: 'center',
    },
    googleBtn: {
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '10px', padding: '13px 20px', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
        color: '#e2e8f0', fontSize: '14.5px', fontWeight: '500',
        cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.01em',
        textDecoration: 'none', boxSizing: 'border-box'
    },
    divider: {
        display: 'flex', alignItems: 'center', gap: '12px',
        margin: '20px 0', color: 'rgba(148,163,184,0.5)', fontSize: '13px',
    },
    dividerLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' },
    dividerText: { whiteSpace: 'nowrap' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    label: {
        display: 'block', fontSize: '13.5px', fontWeight: '500',
        color: 'rgba(203,213,225,0.9)', marginBottom: '7px',
    },
    input: {
        width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        color: '#e2e8f0', fontSize: '14.5px', outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
        fontFamily: 'inherit',
    },
    inputFocus: {
        borderColor: 'rgba(99,102,241,0.6)',
        boxShadow: '0 0 0 3px rgba(99,102,241,0.15)',
        background: 'rgba(99,102,241,0.06)',
    },
    inputBlur: {
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: 'none',
        background: 'rgba(255,255,255,0.05)',
    },
    eyeBtn: {
        position: 'absolute', right: '14px', bottom: '13px',
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(148,163,184,0.6)', padding: '2px', display: 'flex',
    },
    submitBtn: {
        width: '100%', padding: '14px', marginTop: '4px',
        background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
        border: 'none', borderRadius: '12px', color: '#fff',
        fontSize: '15px', fontWeight: '600', cursor: 'pointer',
        letterSpacing: '0.02em', transition: 'all 0.2s',
        boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
        boxSizing: 'border-box'
    },
    submitBtnDisabled: {
        background: 'rgba(99,102,241,0.3)', cursor: 'not-allowed',
        boxShadow: 'none',
    },
    loadingRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    footerText: {
        textAlign: 'center', marginTop: '24px', fontSize: '13.5px',
        color: 'rgba(148,163,184,0.7)',
    },
    footerLink: {
        color: '#818cf8', fontWeight: '600', textDecoration: 'none',
    },
}

export default Register