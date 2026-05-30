import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ResetPassword = () => {
    const { token } = useParams() // Grabs token from URL path
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [checks, setChecks] = useState({ length: false, capital: false, number: false, symbol: false })

    useEffect(() => {
        setChecks({
            length: password.length >= 8,
            capital: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        })
    }, [password])

    const isPasswordStrong = checks.length && checks.capital && checks.number && checks.symbol

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isPasswordStrong) return

        setLoading(true)
        setError('')
        try {
            await axios.post(`/api/users/reset-password/${token}`, { password })
            setMessage("Password successfully updated! Redirecting to login...")
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            setError(err.response?.data?.message || "Link expired or invalid token.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Create New Password</h1>
                    <p style={styles.subtitle}>Ensure your account stays secure by picking a strong password.</p>
                </div>

                <AnimatePresence>
                    {error && <motion.div style={styles.errorBox}>{error}</motion.div>}
                    {message && <motion.div style={styles.successBox}>{message}</motion.div>}
                </AnimatePresence>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{ position: 'relative' }}>
                        <label style={styles.label}>New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.checklistContainer}>
                        <div style={styles.checkRow}>
                            <span style={{ color: checks.length ? '#34A853' : 'rgba(255,255,255,0.3)' }}>✓ At least 8 characters</span>
                        </div>
                        <div style={styles.checkRow}>
                            <span style={{ color: checks.capital ? '#34A853' : 'rgba(255,255,255,0.3)' }}>✓ At least one capital letter</span>
                        </div>
                        <div style={styles.checkRow}>
                            <span style={{ color: checks.number ? '#34A853' : 'rgba(255,255,255,0.3)' }}>✓ At least one number</span>
                        </div>
                        <div style={styles.checkRow}>
                            <span style={{ color: checks.symbol ? '#34A853' : 'rgba(255,255,255,0.3)' }}>✓ At least one special character</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isPasswordStrong}
                        style={{ ...styles.submitBtn, ...((loading || !isPasswordStrong) ? styles.submitBtnDisabled : {}) }}
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

/* Extracted compact reference styles matching ForgotPassword layout */
const styles = {
    page: { minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at 20% 50%, #0f0c29 0%, #1a1040 40%, #0d0d1a 100%)', fontFamily: "'DM Sans', sans-serif" },
    card: { width: '100%', maxWidth: '480px', background: 'rgba(15, 12, 41, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px', boxSizing: 'border-box' },
    header: { textAlign: 'center', marginBottom: '24px' },
    title: { fontSize: '26px', fontWeight: '700', color: '#e2e8f0', margin: '0 0 10px' },
    subtitle: { fontSize: '13.5px', color: 'rgba(148,163,184,0.85)', lineHeight: 1.6, margin: 0 },
    errorBox: { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fca5a5', fontSize: '13px', marginBottom: '16px', textAlign: 'center' },
    successBox: { background: 'rgba(52,168,83,0.12)', border: '1px solid rgba(52,168,83,0.3)', borderRadius: '10px', padding: '10px 14px', color: '#a7f3d0', fontSize: '13px', marginBottom: '16px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    label: { display: 'block', fontSize: '13.5px', fontWeight: '500', color: 'rgba(203,213,225,0.9)', marginBottom: '7px' },
    input: { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' },
    checklistContainer: { background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' },
    checkRow: { display: 'flex', alignItems: 'center', fontSize: '13px' },
    submitBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
    submitBtnDisabled: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed', border: '1px solid rgba(255,255,255,0.05)' }
}

export default ResetPassword