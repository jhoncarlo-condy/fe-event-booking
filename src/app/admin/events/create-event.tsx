import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import Spinner from '@/components/ui/spinner';
import { createEvent } from '@/server/event/event';
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCategories } from '@/server/category/category';
import { Category } from '@/types/types';
import { CalendarIcon, SquarePlus } from 'lucide-react';
import {
	DateTimePicker,
	TimePicker,
} from '@/components/ui/custom/custom-date-time-picker';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const CreateEvent = ({
	setCreateOpen,
}: {
	setCreateOpen: (open: boolean) => void;
}) => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [eventDate, setEventDate] = useState<Date>();
	const [startTime, setStartTime] = useState<Date>();
	const [endTime, setEndTime] = useState<Date>();
	const [capacity, setCapacity] = useState(0);
	const [price, setPrice] = useState(0);
	const [location, setLocation] = useState('');
	const [categories, setCategories] = useState([]);

	const [errorTitle, setErrorTitle] = useState('');
	const [messageTitle, setMessageTitle] = useState('');
	const [errorDescription, setErrorDescription] = useState('');
	const [messageDescription, setMessageDescription] = useState('');
	const [errorEventDate, setErrorEventDate] = useState('');
	const [messageEventDate, setMessageEventDate] = useState('');
	const [errorStartTime, setErrorStartTime] = useState('');
	const [messageStartTime, setMessageStartTime] = useState('');
	const [errorEndTime, setErrorEndTime] = useState('');
	const [messageEndTime, setMessageEndTime] = useState('');
	const [errorCapacity, setErrorCapacity] = useState('');
	const [messageCapacity, setMessageCapacity] = useState('');
	const [errorPrice, setErrorPrice] = useState('');
	const [messagePrice, setMessagePrice] = useState('');
	const [errorLocation, setErrorLocation] = useState('');
	const [messageLocation, setMessageLocation] = useState('');

	const { data: result } = useGetCategories();

	useEffect(() => {
		if (result) {
			setCategories(result.data);
		}
	}, [result]);

	const createEventMutation = useMutation({
		mutationFn: createEvent,
		onSuccess: (data) => {
			setLoading(false);
			if (!data.success) {
				for (const key in data.errors) {
					if (data.errors.hasOwnProperty(key)) {
						const errorMessage = data.errors[key][0]; // Access the first error message for each field
						console.log(`${errorMessage}`); // Log field name and error message
						toast.error(`${errorMessage}`); // Show a toast error with field and messager
						return;
					}
				}
			}
			toast.success('Event Created Successfully!');
			setCreateOpen(false);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
		onError: () => {
			setLoading(false);
			toast.error('An error occurred while creating the event.');
		},
	});

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<any>>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setter(e.target.value);
		};

	const validate = () => {
		let hasError = false;
		setErrorTitle('');
		setMessageTitle('');
		setErrorDescription('');
		setMessageDescription('');
		setErrorEventDate('');
		setMessageEventDate('');
		setErrorStartTime('');
		setMessageStartTime('');
		setErrorEndTime('');
		setMessageEndTime('');
		setErrorCapacity('');
		setMessageCapacity('');
		setErrorPrice('');
		setMessagePrice('');
		setErrorLocation('');
		setMessageLocation('');

		if (!title.trim()) {
			setErrorTitle('error');
			setMessageTitle('Title is required.');
			hasError = true;
		}

		if (!description.trim()) {
			setErrorDescription('error');
			setMessageDescription('Description is required.');
			hasError = true;
		}

		if (!eventDate) {
			setErrorEventDate('error');
			setMessageEventDate('Event date is required.');
			hasError = true;
		}

		if (!startTime) {
			setErrorStartTime('error');
			setMessageStartTime('Start time is required.');
			hasError = true;
		}

		if (!endTime) {
			setErrorEndTime('error');
			setMessageEndTime('End time is required.');
			hasError = true;
		}

		if (capacity <= 0) {
			setErrorCapacity('error');
			setMessageCapacity('Capacity must be a positive number.');
			hasError = true;
		}

		if (price <= 0) {
			setErrorPrice('error');
			setMessagePrice('Price must be a positive number.');
			hasError = true;
		}

		if (!location.trim()) {
			setErrorLocation('error');
			setMessageLocation('Location is required.');
			hasError = true;
		}

		return hasError;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const hasError = validate();
		if (hasError) {
			setLoading(false);
			return;
		}

		const payload = {
			title: title,
			description: description,
			eventDate: format(eventDate, 'yyyy-MM-dd').toString(),
			startTime: format(startTime, 'HH:mm'),
			endTime: format(endTime, 'HH:mm'),
			capacity: String(capacity),
			price: String(price),
			location: location,
			status: status,
			categories: categories,
		};

		console.log(payload);

		createEventMutation.mutate(payload);
	};

	const handleCreateCategoryModal = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
				Create Event
			</h1>
			<div className='flex flex-col space-y-4'>
				<form onSubmit={handleSubmit}>
					{/* Title */}
					<div className='mt-5'>
						<FloatingLabelInput
							id='title'
							label='Event Title'
							type='text'
							name='title'
							value={title}
							onChange={handleInputChange(setTitle)}
							className={`${errorTitle} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorTitle && (
							<span className={`${errorTitle} text-sm mt-1`}>
								{messageTitle}
							</span>
						)}
					</div>

					{/* Description */}
					<div className='mt-5'>
						<FloatingLabelInput
							id='description'
							label='Description'
							type='text'
							name='description'
							value={description}
							onChange={handleInputChange(setDescription)}
							className={`${errorDescription} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorDescription && (
							<span className={`${errorDescription} text-sm mt-1`}>
								{messageDescription}
							</span>
						)}
					</div>

					{/* Capacity */}
					<div className='mt-5'>
						<FloatingLabelInput
							id='capacity'
							label='Capacity'
							type='number'
							name='capacity'
							min='1'
							value={capacity}
							onChange={handleInputChange(setCapacity)}
							className={`${errorCapacity} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorCapacity && (
							<span className={`${errorCapacity} text-sm mt-1`}>
								{messageCapacity}
							</span>
						)}
					</div>

					{/* Price */}
					<div className='mt-5'>
						<FloatingLabelInput
							id='price'
							label='Price'
							type='number'
							name='price'
							min='1'
							value={price}
							onChange={handleInputChange(setPrice)}
							className={`${errorPrice} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorPrice && (
							<span className={`${errorPrice} text-sm mt-1`}>
								{messagePrice}
							</span>
						)}
					</div>

					{/* Location */}
					<div className='mt-5'>
						<FloatingLabelInput
							id='location'
							label='Location'
							type='text'
							name='location'
							value={location}
							onChange={handleInputChange(setLocation)}
							className={`${errorLocation} w-full border border-gray-300 p-2 mb-1 rounded`}
						/>
						{errorLocation && (
							<span className={`${errorLocation} text-sm mt-1`}>
								{messageLocation}
							</span>
						)}
					</div>

					{/* Event Date */}
					<div className='mt-5'>
						<Label className='mb-2'>Event Date</Label>
						<DateTimePicker
							granularity='day'
							value={eventDate}
							onChange={setEventDate}
						/>
						{errorEventDate && (
							<span className={`${errorEventDate} text-sm mt-1`}>
								{messageEventDate}
							</span>
						)}
					</div>

					{/* Start Time */}
					<div className='mt-5 flex flex-row'>
						<div className='mr-2'>
							<Label className='ml-10 mb-2'>Start Time</Label>
							<TimePicker date={startTime} onChange={setStartTime} />
							{errorStartTime && (
								<span className={`${errorStartTime} text-sm mt-1`}>
									{messageStartTime}
								</span>
							)}
						</div>
						<div>
							<Label className='ml-10 mb-2'>End Time</Label>
							<TimePicker date={endTime} onChange={setEndTime} />
							{errorEndTime && (
								<span className={`${errorEndTime} text-sm mt-1`}>
									{messageEndTime}
								</span>
							)}
						</div>
					</div>

					{/* Categories */}
					<div className='mt-5'>
						<Label>Category</Label>
						<div className='space-y-2 mt-2 flex flex-row items-center'>
							<Select>
								<SelectTrigger
									className={`${errorLocation} w-5/6 border border-gray-300 p-2 mb-1 rounded mr-2`}
								>
									<SelectValue placeholder='Select Categories' />
								</SelectTrigger>
								<Button
									className='bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition'
									onClick={handleCreateCategoryModal}
								>
									<SquarePlus size={30} />
									Create
								</Button>
								<SelectContent>
									{categories.map((category: Category) => (
										<SelectItem key={category.id} value={String(category.id)}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Submit Button */}
					<Button
						type='submit'
						className={`${
							loading ? 'disabled ' : ''
						} w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded transition mt-4`}
					>
						{loading ? <Spinner /> : 'Create Event'}
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateEvent;
