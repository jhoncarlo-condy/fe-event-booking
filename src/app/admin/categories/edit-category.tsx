import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import Spinner from '@/components/ui/spinner';
import { getCategoryDetail, updateCategory } from '@/server/category/category';
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditCategory = ({
	setUpdateOpen,
	selectedCategory,
}: {
	setUpdateOpen: (open: boolean) => void;
	selectedCategory: number;
}) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorName, setErrorName] = useState('');
	const [messageName, setMessageName] = useState('');
	const [hasFetched, setHasFetched] = useState(false);

	const categoryDetailMutation = useMutation({
		mutationFn: getCategoryDetail,
		onSuccess: (data) => {
			setHasFetched(true);
			setName(data.name);
		},
	});

	useEffect(() => {
		if (!hasFetched) {
			categoryDetailMutation.mutate({ id: selectedCategory });
			setHasFetched(true);
		}
	}, [selectedCategory, categoryDetailMutation, hasFetched]);

	const updateCategoryMutation = useMutation({
		mutationFn: updateCategory,
		onSuccess(data) {
			setLoading(false);
			if (!data.success) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
			setUpdateOpen(false);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const hasError = validate();
		if (!hasError) {
			updateCategoryMutation.mutate({ id: selectedCategory, name });
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
				Edit Category
			</h1>
			<div className='flex flex-col space-y-4'>
				<form onSubmit={handleSubmit}>
					<div>
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
						disabled={loading}
					>
						{loading ? <Spinner /> : 'Update'}
					</Button>
				</form>
			</div>
		</>
	);
};

export default EditCategory;
