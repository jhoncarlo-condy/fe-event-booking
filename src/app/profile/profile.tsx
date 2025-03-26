'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { changePassword, updateUser, useGetUser } from '@/server/User/User';
import Spinner from '@/components/ui/spinner';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const Profile = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loadingProfile, setLoadingProfile] = useState(false);
	const [loadingPass, setLoadingPass] = useState(false);

	const [errorFirstName, setErrorFirstName] = useState<string>('');
	const [errorLastName, setErrorLastName] = useState<string>('');
	const [errorOldPassword, setErrorOldPassword] = useState<string>('');
	const [errorPassword, setErrorPassword] = useState<string>('');
	const [errorPasswordConfirmation, setErrorPasswordConfirmation] =
		useState<string>('');

	const [messageFirstName, setMessageFirstName] = useState<string>('');
	const [messageLastName, setMessageLastName] = useState<string>('');
	const [messageOldPassword, setMessageOldPassword] = useState<string>('');
	const [messagePassword, setMessagePassword] = useState<string>('');
	const [messagePasswordConfirmation, setMessagePasswordConfirmation] =
		useState<string>('');

	const { data: result } = useGetUser();

	useEffect(() => {
		if (result) {
			const data = result.data;
			setFirstName(data.first_name || '');
			setLastName(data.last_name || '');
			setEmail(data.email || '');
		}
	}, [result]);

	const updateUserMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			setLoadingProfile(false);
			if (!data.success) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
		},
	});

	const updatePassMutation = useMutation({
		mutationFn: changePassword,
		onSuccess: (data) => {
			setLoadingPass(false);
			if (!data.success) {
				toast.error(data.message);
				setErrorOldPassword('error');
				setMessageOldPassword(data.message);
				return;
			}
			toast.success(data.message);
			Cookies.remove('token');
			Cookies.remove('role');
			setTimeout(() => {
				window.location.replace('/');
			}, 1000);
		},
	});

	const handleUpdateProfile = (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingProfile(true);
		const hasError = validateUpdateProfile();
		if (!hasError) {
			updateUserMutation.mutate({ firstName, lastName, email });
			return;
		}
		setLoadingProfile(false);
	};

	const validateUpdateProfile = () => {
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
		};

		setErrorFirstName(errors.firstName ? 'error' : '');
		setErrorLastName(errors.lastName ? 'error' : '');

		setMessageFirstName(errors.firstName);
		setMessageLastName(errors.lastName);
		return Object.values(errors).some((error) => error !== '');
	};

	const handleChangePass = (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingPass(true);
		const hasErrors = validateHandleChangePass();
		if (!hasErrors) {
			updatePassMutation.mutate({
				oldPassword,
				password,
				passwordConfirmation,
			});
			return;
		}
		setLoadingPass(false);
	};

	const validateHandleChangePass = () => {
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
			oldPassword: validateField(oldPassword, 'Old Password', 8, 255),
			password: validateField(password, 'New Password', 8, 255),
			passwordConfirmation: validateField(
				passwordConfirmation,
				'Confirm Password',
				8,
				255
			),
		};

		if (
			password.length >= 8 &&
			passwordConfirmation.length >= 8 &&
			password !== passwordConfirmation
		) {
			errors.passwordConfirmation =
				'New Password and Confirm Password must match';
		}

		setErrorOldPassword(errors.oldPassword ? 'error' : '');
		setErrorPassword(errors.password ? 'error' : '');
		setErrorPasswordConfirmation(errors.passwordConfirmation ? 'error' : '');

		setMessageOldPassword(errors.oldPassword);
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

	const handleOldPasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setOldPassword(event.target.value);
		setErrorOldPassword('');
		setMessageOldPassword('');
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
		<div className='flex-grow border p-4 '>
			<Label className='m-10 text-3xl'>Profiles</Label>
			<div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2 m-10'>
				<Card className='ml-10 mr-10 mt-5 mb-5'>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<form onSubmit={handleUpdateProfile}>
						<CardContent>
							<div className='space-y-4'>
								{' '}
								{/* Changed space-y-2 to space-y-4 here */}
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
							<div className='space-y-4 mt-4'>
								{' '}
								{/* Changed space-y-2 to space-y-4 here */}
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
							<div className='space-y-4 mt-4'>
								<FloatingLabelInput
									id='email'
									label='Email'
									type='email'
									name='email'
									value={email}
									disabled={true}
									className='w-full border border-gray-300 p-2 mb-1 rounded disabled'
								/>
							</div>
						</CardContent>
						<CardFooter className='border-t px-6 py-4 mt-10'>
							<Button
								type='submit'
								className={`${
									loadingProfile ? 'disabled ' : ''
								} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
							>
								{loadingProfile ? <Spinner /> : 'Save'}
							</Button>
						</CardFooter>
					</form>
				</Card>

				<Card className='ml-10 mr-10 mt-5 mb-5'>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<form onSubmit={handleChangePass}>
						<CardContent>
							<div className='space-y-4'>
								{' '}
								{/* Changed space-y-2 to space-y-4 here */}
								<FloatingLabelInput
									id='oldPassword'
									label='Old Password'
									type='password'
									name='oldPassword'
									value={oldPassword}
									onChange={handleOldPasswordOnChange}
									className={`${
										errorOldPassword ? errorOldPassword : ''
									} w-full border border-gray-300 p-2 mb-1 rounded`}
								/>
								{errorOldPassword && (
									<span className={`${errorOldPassword} text-sm mt-1`}>
										{messageOldPassword}
									</span>
								)}
							</div>
							<div className='space-y-4 mt-4'>
								{' '}
								{/* Changed space-y-2 to space-y-4 here */}
								<FloatingLabelInput
									id='password'
									label='New Password'
									type='password'
									name='password'
									value={password}
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
							<div className='space-y-4 mt-4'>
								{' '}
								{/* Changed space-y-2 to space-y-4 here */}
								<FloatingLabelInput
									id='passwordConfirmation'
									label='Confirm Password'
									type='password'
									name='passwordConfirmation'
									value={passwordConfirmation}
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
						</CardContent>
						<CardFooter className='border-t px-6 py-4 mt-10'>
							<Button
								type='submit'
								className={`${
									loadingPass ? 'disabled ' : ''
								} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
							>
								{loadingPass ? <Spinner /> : 'Save'}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
