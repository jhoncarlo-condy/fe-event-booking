'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Input } from '../ui/input';

const SignUp = () => {
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

		document.cookie = `token=${encodeURIComponent(
			token
		)}; path=/; Secure; SameSite=Lax`;

		router.push(userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard');
	}, [email, password, router]);

	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Sign Up
			</h1>
			<Input
				type='text'
				placeholder='zxc'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='w-full border border-gray-300 p-2 mb-3 rounded hx-10px'
			/>
			<input
				type='text'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
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
				Sign Up
			</button>
		</>
	);
};

export default SignUp;
