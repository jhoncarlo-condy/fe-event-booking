'use client';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import Spinner from '@/components/ui/spinner';
import { getUserDetail, updateUser } from '@/server/User/User';
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditUser = ({
	setUpdateOpen,
	selectedUser,
}: {
	setUpdateOpen: (open: boolean) => void;
	selectedUser: string;
}) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [loading, setLoading] = useState(false);

	const [errorFirstName, setErrorFirstName] = useState<string>('');
	const [errorLastName, setErrorLastName] = useState<string>('');

	const [messageFirstName, setMessageFirstName] = useState<string>('');
	const [messageLastName, setMessageLastName] = useState<string>('');
    const [hasFetched, setHasFetched] = useState(false);

	const userDetailMutation = useMutation({
		mutationFn: getUserDetail,
		onSuccess: (data) => {
			setHasFetched(true);
			setFirstName(data.first_name);
			setLastName(data.last_name);
			setEmail(data.email);
		},
	});

	useEffect(() => {
       if(!hasFetched) {
        userDetailMutation.mutate({ email: selectedUser });
        setHasFetched(true);
       }
	}, [selectedUser, userDetailMutation, hasFetched]);

	const updateUserMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			setLoading(false);
			if (!data.success) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
			setUpdateOpen(false);
			setTimeout(()=>{
                window.location.reload();
            }, 1000)
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const hasError = validateUpdateProfile();
		if (!hasError) {
			updateUserMutation.mutate({ firstName, lastName, email });
			return;
		}
		setLoading(false);
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

	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Update User
			</h1>
			<div className='flex flex-col space-y-4'>
				<form onSubmit={handleSubmit}>
					<div>
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
					<Button
						type='submit'
						className={`${
							loading ? 'disabled ' : ''
						} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
						disabled={loading}
					>
						{loading ? <Spinner /> : 'Update'}
					</Button>
				</form>
			</div>
		</>
	);
};

export default EditUser;
