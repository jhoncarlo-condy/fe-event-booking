'use client';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/types';
import { useGetUsers } from '@/server/User/User';
import { capitalize } from '@/utils/helpers';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CreateUser from './create-user';
import EditUser from './edit-user';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [createOpen, setCreateOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: result, isLoading } = useGetUsers();

	useEffect(() => {
		if (result) {
			setUsers(result.data);
		}
	}, [result]);

	const paginatedUsers = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return users.slice(start, start + itemsPerPage);
	}, [users, currentPage]);

	const totalPages = Math.ceil(users.length / itemsPerPage);

	const handleCreateModal = (e: React.FormEvent) => {
		e.preventDefault();
		setCreateOpen(true);
	};

	const handleEditModal = (e: React.FormEvent, email: string) => {
		e.preventDefault();
		setSelectedUser(email);
		setUpdateOpen(true);
	};

	return (
		<div className='flex-grow border p-4'>
			<Label className='m-10 text-3xl'>Manage Users</Label>
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
								<TableHead>First Name</TableHead>
								<TableHead>Last Name</TableHead>
								<TableHead className='hidden md:table-cell'>Email</TableHead>
								<TableHead className='hidden md:table-cell'>Role</TableHead>
								<TableHead className='hidden md:table-cell'>
									Created at
								</TableHead>
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
								paginatedUsers.map((user: User) => (
									<TableRow key={user.id}>
										<TableCell className='font-medium'>
											{capitalize(user.first_name)}
										</TableCell>
										<TableCell>{capitalize(user.last_name)}</TableCell>
										<TableCell className='hidden md:table-cell'>
											{user.email}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											<Badge
												className={
													user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
												}
											>
												{capitalize(user.role)}
											</Badge>
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{new Date(user.created_at).toLocaleDateString()}
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
														onClick={(e) => handleEditModal(e, user.email)}
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
						{Math.min(itemsPerPage * currentPage, users.length)} of{' '}
						{users.length}
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
			{/* Create User */}
			<Dialog open={createOpen} onOpenChange={setCreateOpen}>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent
					onPointerDownOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={(e) => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<CreateUser setCreateOpen={setCreateOpen} />
				</DialogContent>
			</Dialog>
			{/* Edit User */}
			<Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent
					onPointerDownOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={(e) => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<EditUser setUpdateOpen={setUpdateOpen} selectedUser={selectedUser} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Users;
