'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = useCallback(async () => {
		let userRole = '';
		if (email === 'admin@example.com' && password === 'admin123') {
			userRole = 'admin';
		} else if (email === 'user@example.com' && password === 'user123') {
			userRole = 'user';
		} else {
			alert('Invalid credentials');
			return;
		}

		const token = btoa(JSON.stringify({ email, role: userRole }));

		document.cookie = `token=${encodeURIComponent(token)}; path=/; Secure; SameSite=Lax`;

		router.push(userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard');
	}, [email, password, router]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
			<h1 className='text-2xl font-bold mb-6 text-gray-800'>Login</h1>
			<div className='w-full max-w-sm bg-white p-6 rounded-lg shadow-md'>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full border border-gray-300 p-2 mb-3 rounded'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full border border-gray-300 p-2 mb-4 rounded'
				/>
				<button
					onClick={handleLogin}
					className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
