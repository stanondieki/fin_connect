import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password, rememberMe });
            if (response.data.success) {
                router.push('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
        if (error) setError('');
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                        required
                        className="w-full p-3 border text-black border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        required
                        className="w-full p-3 border text-black border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Remember Me checkbox */}
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

            {/* Forgot Password link */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
                <p>
                    Don't have an account? 
                    <a href="/Auth/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
