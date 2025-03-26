'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { capitalize } from '@/utils/helpers';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CreateEvent from './create-event';
import EditEvent from './edit-event';
import { useGetEvents } from '@/server/event/event';
import { Event } from '@/types/types';

const Events = () => {
	const [events, setEvents] = useState([]);
	const [createOpen, setCreateOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [selectedEvent, setselectedEvent] = useState<number>();

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: result, isLoading } = useGetEvents();

	useEffect(() => {
		if (result) {
			setEvents(result.data);
		}
	}, [result]);

	const paginatedEvents = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return events.slice(start, start + itemsPerPage);
	}, [events, currentPage]);

	const totalPages = Math.ceil(events.length / itemsPerPage);

	const handleCreateModal = (e: React.FormEvent) => {
		e.preventDefault();
		setCreateOpen(true);
	};

	const handleEditModal = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setselectedEvent(id);
		setUpdateOpen(true);
	};

	return (
		<div className='flex-grow border p-4'>
			<Label className='m-10 text-3xl'>Manage Events</Label>
			<Card className='m-10'>
				<CardHeader className='flex justify-between items-center'>
					<CardTitle></CardTitle>
					<Button
						className='bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded'
						onClick={handleCreateModal}
					>
						Create
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className='hidden md:table-cell'>Capacity</TableHead>
								<TableHead className='hidden md:table-cell'>
									Start Date
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Start Time - End Time
								</TableHead>
								<TableHead className='hidden md:table-cell'>Price</TableHead>
								<TableHead className='hidden md:table-cell'>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={6} className='text-center'>
										Loading...
									</TableCell>
								</TableRow>
							) : (
								paginatedEvents.map((event: Event) => (
									<TableRow key={event.id}>
										<TableCell className='font-medium'>
											{capitalize(event.title)}
										</TableCell>
										<TableCell>{capitalize(event.description)}</TableCell>
										<TableCell className='hidden md:table-cell'>
											{event.capacity}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{new Date(event.event_date).toLocaleDateString()}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{event.start_time + ' - ' + event.end_time}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{event.price}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{event.status}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button size='icon' variant='ghost'>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={(e) => handleEditModal(e, event.id)}
													>
														Edit
													</DropdownMenuItem>
													{/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className='flex justify-between items-center p-4'>
					<span className='text-sm'>
						Showing {itemsPerPage * (currentPage - 1) + 1} -{' '}
						{Math.min(itemsPerPage * currentPage, events.length)} of{' '}
						{events.length}
					</span>
					<div className='flex gap-2'>
						<Button
							className='hover:cursor-pointer'
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((prev) => prev - 1)}
						>
							Prev
						</Button>
						<Button
							className='hover:cursor-pointer'
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage((prev) => prev + 1)}
						>
							Next
						</Button>
					</div>
				</CardFooter>
			</Card>
			{/* Create Event */}
			<Dialog open={createOpen} onOpenChange={setCreateOpen}>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent
					onPointerDownOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={(e) => e.preventDefault()}
					className='overflow-auto max-h-[90vh] w-full md:w-[500px] rounded-lg'
				>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<CreateEvent setCreateOpen={setCreateOpen} />
				</DialogContent>
			</Dialog>
			{/* Edit Event */}
			<Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent
					onPointerDownOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={(e) => e.preventDefault()}
					className='overflow-auto max-h-[90vh] w-full md:w-[500px] rounded-lg'
				>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<EditEvent
						setUpdateOpen={setUpdateOpen}
						selectedEvent={selectedEvent}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Events;
