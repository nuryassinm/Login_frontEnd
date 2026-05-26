import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

// ✅ FIX: Destructure props correctly
const Login = ({ setUser }) => {  // ← Make sure it's in curly braces
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            console.log("Attempting login with:", formData.email);
            
            const res = await axios.post('/api/users/login', formData);
            
            console.log("Login response:", res.data);
            
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                // ✅ FIX: setUser is now a function
                setUser(res.data);
                navigate('/');
            } else {
                setError("No token received");
            }
        } catch (err) {
            console.error("Login error details:", err);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen w-full flex py-20 justify-center'>
            <div className='h-fit p-2 w-full max-w-xl border border-black justify-center'>
                <div className='p-8 font-bold text-center rounded-lg'>
                    <h1 className="text-2xl">Login</h1>
                    {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div>
                        <label className='block text-gray-700 text-sm font-medium mb-1'>
                            Email
                        </label>
                        <input 
                            autoComplete='off'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            placeholder='Enter Your Email'
                            className='w-full p-3 border border-gray-300 rounded-md'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-medium mb-1'>
                            Password
                        </label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            type="password" 
                            placeholder='Enter Your Password' 
                            className='w-full p-3 border border-gray-300 rounded-md'
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className='bg-blue-500 text-white font-bold cursor-pointer p-2 rounded-lg m-2 disabled:bg-gray-400 w-full'
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <p className=' flex gap-2'>Don't have account  <Link to="/Register" className=' text-blue-500'>register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login