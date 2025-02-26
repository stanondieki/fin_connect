import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            console.log('Full API Response:', response);
    
            if (response.data && response.data.access_token) {
                localStorage.setItem('authToken', response.data.access_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    
                setSuccessMessage('Login Successful');
                setTimeout(() => setSuccessMessage(''), 3000);
    
                await router.push('/dash/dashboard');
            } else {
                setError('Login failed: Invalid response from API');
            }
        } catch (err) {
            console.error('Login error:', err.response || err);
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg relative">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border text-black border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border text-black border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        <button 
                            type="button" 
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-3"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}  
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 text-black border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-gray-700">Remember Me</label>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-3 text-white rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-500'} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <a href="/Auth/forgotpassword" className="text-blue-600 hover:underline">Forgot Password?</a>
                <p>
                    Don't have an account? 
                    <a href="/Auth/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>

            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default SignIn;