'use client';
import { Label } from '../ui/label';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import SignUp from '@/components/signup/SignUp';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/server/User/User';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SignIn = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			if(data?.role) {
				Cookies.set("token", data.access_token, { secure: true, sameSite: "Strict" });
				Cookies.set("role", data.role, { secure: true, sameSite: "Strict" });
				if(data.role == 'admin') {
					router.push('/admin/dashboard');
				} else {
					router.push('/user/dashboard');
				}
			}
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loginMutation.mutate({ email, password });
	};
	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Login
			</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type='email'
					name='email'
					placeholder='Email'
					value={email}
					required={true}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full border border-gray-300 p-2 mb-4 rounded'
				/>
				<Input
					type='password'
					name='password'
					placeholder='Password'
					value={password}
					required={true}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full border border-gray-300 p-2 mb-4 rounded'
				/>
				<button
					type='submit'
					className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'
				>
					Login
				</button>
			</form>
			<div className='flex flex-row'>
				<Label className='text-center'>Don&apos;t have an account?&nbsp;</Label>
				<Dialog>
					<DialogTrigger>Sign Up</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<SignUp />
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default SignIn;
