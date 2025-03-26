'use client';
import { useGetCategories } from '@/server/category/category';
import { Category } from '@/types/types';
import React, { useEffect, useMemo, useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { capitalize } from '@/utils/helpers';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import CreateCategory from './create-category';
import EditCategory from './edit-category';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Label } from '@/components/ui/label';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [createOpen, setCreateOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<number>(0);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: result, isLoading } = useGetCategories();

	useEffect(() => {
		if (result) {
			setCategories(result.data);
		}
	}, [result]);

	const paginatedCategories = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return categories.slice(start, start + itemsPerPage);
	}, [categories, currentPage]);

	const totalPages = Math.ceil(categories.length / itemsPerPage);

	const handleCreateModal = (e: React.FormEvent) => {
		e.preventDefault();
		setCreateOpen(true);
	};

	const handleEditModal = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setSelectedCategory(id);
		setUpdateOpen(true);
	};

	return (
		<div className='flex-grow border p-4'>
			<Label className='m-10 text-3xl'>Manage Categories</Label>
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
								<TableHead className='w-2/6'>ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className='w-1/6'>Actions</TableHead>
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
								paginatedCategories.map((category: Category) => (
									<TableRow key={category.id}>
										<TableCell className='font-medium'>{category.id}</TableCell>
										<TableCell>{capitalize(category.name)}</TableCell>
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
                                                        className='hover:cursor-pointer'
														onClick={(e) => handleEditModal(e, category.id)}
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
						{Math.min(itemsPerPage * currentPage, categories.length)} of{' '}
						{categories.length}
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
				<DialogContent>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<CreateCategory setCreateOpen={setCreateOpen} />
				</DialogContent>
			</Dialog>
			{/* Edit User */}
			<Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<EditCategory
						setUpdateOpen={setUpdateOpen}
						selectedCategory={selectedCategory}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Categories;
