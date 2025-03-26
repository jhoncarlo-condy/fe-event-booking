import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import Spinner from '@/components/ui/spinner';
import { createCategory } from '@/server/category/category';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

const CreateCategory = ({
	setCreateOpen,
	setSelectedCategory,
}: {
	setCreateOpen: (open: boolean) => void;
	setSelectedCategory?: (id: number | null) => void;
}) => {
	const pathname = usePathname();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState('');
	const [messageName, setMessageName] = useState('');

	const createCategoryMutation = useMutation({
		mutationFn: createCategory,
		onSuccess: (data) => {
			setLoading(false);

			if (!data.success) {
				toast.error(data.message);
				return;
			}

			toast.success('Category created successfully!');
			setCreateOpen(false);

			if (pathname === '/admin/categories') {
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}

			if (setSelectedCategory) {
				setSelectedCategory(data.data.id);
			}
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const hasError = validate();
		if (!hasError) {
			createCategoryMutation.mutate({
				name,
			});
			return;
		}

		setLoading(false);
	};

	const validate = () => {
		let hasError = false;
		if (name.length < 1) {
			setErrorName('error');
			setMessageName('Name field is required');
			hasError = true;
		}

		if (name.length >= 255) {
			setErrorName('error');
			setMessageName('Name field mustbe at most 255 chararacters long.');
			hasError = true;
		}

		return hasError;
	};

	const handleNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		setErrorName('');
		setMessageName('');
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
							id='name'
							label='Name'
							type='text'
							name='name'
							value={name}
							onChange={handleNameOnChange}
							className={`${
								errorName ? errorName : ''
							} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorName && (
							<span className={`${errorName} text-sm mt-1`}>{messageName}</span>
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

export default CreateCategory;
