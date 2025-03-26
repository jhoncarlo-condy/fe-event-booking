import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import Spinner from '@/components/ui/spinner';
import { registerUser } from '@/server/User/User';
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

const CreateUser = ({ setCreateOpen }: { setCreateOpen: (open: boolean) => void }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);

	const [errorFirstName, setErrorFirstName] = useState<string>('');
	const [errorLastName, setErrorLastName] = useState<string>('');
	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorPassword, setErrorPassword] = useState<string>('');
	const [errorPasswordConfirmation, setErrorPasswordConfirmation] =
		useState<string>('');
	const [messageFirstName, setMessageFirstName] = useState<string>('');
	const [messageLastName, setMessageLastName] = useState<string>('');
	const [messageEmail, setMessageEmail] = useState<string>('');
	const [messagePassword, setMessagePassword] = useState<string>('');
	const [messagePasswordConfirmation, setMessagePasswordConfirmation] =
		useState<string>('');

	const registerMutation = useMutation({
		mutationFn: registerUser,
		onSuccess: (data) => {
			setLoading(false);

			if (!data.success) {
				toast.error(data.message);
				return;
			}

			toast.success('User Created Successfully!');
			setCreateOpen(false);
            window.location.reload();
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const hasError = validate();
		if (!hasError) {
			registerMutation.mutate({
				firstName,
				lastName,
				email,
				password,
				passwordConfirmation,
			});
			return;
		}
		setLoading(false);
	};

	const validate = () => {
		const validateField = (field: string, name: string, min = 1, max = 255) => {
			if (field.trim() === '') return `${name} field is required`;
			if (field.length < min)
				return `${name} must have at least ${min} character${
					min > 1 ? 's' : ''
				}.`;
			if (field.length > max)
				return `${name} must be at most ${max} characters long.`;
			return '';
		};

		const errors = {
			firstName: validateField(firstName, 'First Name'),
			lastName: validateField(lastName, 'Last Name'),
			email: validateField(email, 'Email'),
			password: validateField(password, 'Password', 8, 255),
			passwordConfirmation: validateField(
				passwordConfirmation,
				'Password Confirmation',
				8,
				255
			),
		};

		if (
			password.length >= 8 &&
			passwordConfirmation.length >= 8 &&
			password !== passwordConfirmation
		) {
			errors.passwordConfirmation = 'Password and Confirm Password must match';
		}

		setErrorFirstName(errors.firstName ? 'error' : '');
		setErrorLastName(errors.lastName ? 'error' : '');
		setErrorEmail(errors.email ? 'error' : '');
		setErrorPassword(errors.password ? 'error' : '');
		setErrorPassword(errors.passwordConfirmation ? 'error' : '');
		setErrorPasswordConfirmation(errors.passwordConfirmation ? 'error' : '');

		setMessageFirstName(errors.firstName);
		setMessageLastName(errors.lastName);
		setMessageEmail(errors.email);
		setMessagePassword(errors.password);
		setMessagePasswordConfirmation(errors.passwordConfirmation);

		return Object.values(errors).some((error) => error !== '');
	};

	const handleFirstNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.target.value);
		setErrorFirstName('');
		setMessageFirstName('');
	};

	const handleLastNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLastName(event.target.value);
		setErrorLastName('');
		setMessageLastName('');
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

	const handlePasswordConfirmationOnChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setPasswordConfirmation(event.target.value);
		setErrorPasswordConfirmation('');
		setMessagePasswordConfirmation('');
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Create User
			</h1>
			<div className='flex flex-col space-y-4'>
				<form onSubmit={handleSubmit}>
					<div>
						{' '}
						<FloatingLabelInput
							id='firstName'
							label='First Name'
							type='text'
							name='firstName'
							value={firstName}
							onChange={handleFirstNameOnChange}
							className={`${
								errorFirstName ? errorFirstName : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorFirstName && (
							<span className={`${errorFirstName} text-sm mt-1`}>
								{messageFirstName}
							</span>
						)}
					</div>
					<div className='mt-4'>
						{' '}
						<FloatingLabelInput
							id='lastName'
							label='Last Name'
							type='text'
							name='lastName'
							value={lastName}
							onChange={handleLastNameOnChange}
							className={`${
								errorLastName ? errorLastName : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorLastName && (
							<span className={`${errorLastName} text-sm mt-1`}>
								{messageLastName}
							</span>
						)}
					</div>
					<div className='mt-4'>
						{' '}
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
						<FloatingLabelInput
							id='password'
							label='Password'
							type='password'
							name='password'
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
					<div className='mt-4'>
						{' '}
						<FloatingLabelInput
							id='passwordConfirmation'
							type='password'
							name='passwordConfirmation'
							label='Confirm Password'
							value={passwordConfirmation}
							min='8'
							onChange={handlePasswordConfirmationOnChange}
							className={`${
								errorPasswordConfirmation ? errorPasswordConfirmation : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorPasswordConfirmation && (
							<span className={`${errorPasswordConfirmation} text-sm mt-1`}>
								{messagePasswordConfirmation}
							</span>
						)}
					</div>
					<Button
						type='submit'
						className={`${
							loading ? 'disabled ' : ''
						} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
					>
						{loading ? <Spinner /> : 'Create'}
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateUser;
