import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
            if (response.data.success) {
                setMessage('Password reset link sent successfully');
                setMessageType('success');
                router.push('/signin'); // Redirect to sign-in page after sending the link
            } else {
                setMessage(response.data.message);
                setMessageType('error');
            }
        } catch (err) {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (message) setMessage(''); // Clear message if user changes input
    };

    return (
        <div className="relative max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg  items-center justify-center">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border text-black border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-500'} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
            </form>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <a href="/Auth/signin" className="text-blue-600 hover:underline">Back to Sign In</a>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div className={`absolute bottom-6 right-6 p-4 rounded-lg text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
