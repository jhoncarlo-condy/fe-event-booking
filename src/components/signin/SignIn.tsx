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
import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/server/User/User';
import Cookies from 'js-cookie';
import { Button } from '../ui/button';
import Spinner from '../ui/spinner';
import toast from 'react-hot-toast';
import { FloatingLabelInput } from '../ui/floating-label-input';

const SignIn = () => {
	const [signUpOpen, setSignUpOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorPassword, setErrorPassword] = useState<string>('');
	const [messageEmail, setMessageEmail] = useState<string>('');
	const [messagePassword, setMessagePassword] = useState<string>('');

	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			setLoading(false);
			if (!data.success) {
				toast.error(data.message);
				return;
			}

			if (data?.role) {
				toast.success('Login Successful');
				Cookies.set('token', data.access_token, {
					secure: true,
					sameSite: 'Strict',
				});
				Cookies.set('role', data.role, { secure: true, sameSite: 'Strict' });
				if (data.role == 'admin') {
					setTimeout(() => {
						window.location.replace('/admin/dashboard');
					}, 1000);
				} else {
					setTimeout(() => {
						window.location.replace('/admin/dashboard');
					}, 1000);
				}
			}
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const hasError = validate();
		if (!hasError) {
			loginMutation.mutate({ email, password });
			return;
		}
		setLoading(false);
	};

	const validate = () => {
		let hasError = false;
		if (email === '') {
			setErrorEmail('error');
			setMessageEmail('Email field is required');
			hasError = true;
		}

		if (password === '') {
			setErrorPassword('error');
			setMessagePassword('Password field is required');
			hasError = true;
		} else if (password.length < 8) {
			setErrorPassword('error');
			setMessagePassword('Password must be at least 8 characters long.');
			hasError = true;
		}

		return hasError;
	};

	const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setErrorEmail('');
		setMessageEmail('');
	};

	const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setErrorPassword('');
		setMessagePassword('');
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Login
			</h1>
			<div className='flex flex-col space-y-4'>
				<form onSubmit={handleSubmit}>
					<div>
						{' '}
						{/* Changed space-y-2 to space-y-4 here */}
						<FloatingLabelInput
							id='email'
							label='Email'
							type='email'
							name='email'
							value={email}
							onChange={handleEmailOnChange}
							className={`${
								errorEmail ? errorEmail : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorEmail && (
							<span className={`${errorEmail} text-sm mt-1`}>
								{messageEmail}
							</span>
						)}
					</div>
					<div className='mt-4'>
						{' '}
						{/* space-y-4 ensures there's space between the inputs */}
						<FloatingLabelInput
							id='password'
							type='password'
							name='password'
							label='Password'
							value={password}
							min='8'
							onChange={handlePasswordOnChange}
							className={`${
								errorPassword ? errorPassword : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorPassword && (
							<span className={`${errorPassword} text-sm mt-1`}>
								{messagePassword}
							</span>
						)}
					</div>
					<Button
						type='submit'
						className={`${
							loading ? 'disabled ' : ''
						} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
					>
						{loading ? <Spinner /> : 'Login'}
					</Button>
				</form>
			</div>

			<div className='flex flex-row mt-2'>
				<Label className='text-center'>Don&apos;t have an account?&nbsp;</Label>
				<Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
					<DialogTrigger asChild>
						<Label className='text-blue-600 hover:cursor-pointer hover:underline'>
							Sign Up
						</Label>
					</DialogTrigger>
					<DialogContent
						onPointerDownOutside={(e) => e.preventDefault()}
						onEscapeKeyDown={(e) => e.preventDefault()}
					>
						<DialogHeader>
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<SignUp setSignUpOpen={setSignUpOpen} />
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default SignIn;
