import {
	CalendarDays,
	ChartBarStacked,
	LayoutDashboard,
	LogOut,
	Scroll,
	UserCog,
	UserPen,
} from 'lucide-react';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { logoutUser } from '@/server/User/User';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const AdminMenu = () => {
	const router = useRouter();
	const logoutMutation = useMutation({
		mutationFn: logoutUser,
		onSuccess: (data) => {
			if (data.success) {
				Cookies.remove('token');
				Cookies.remove('role');
				toast.success('Logout successfully');
				setTimeout(() => {
					window.location.replace('/');
				}, 1000);
			}
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<UserCog className='text-white hover:cursor-pointer' />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							className='hover:cursor-pointer'
							onClick={() => router.push('/admin/dashboard')}
						>
							Dashboard
							<DropdownMenuShortcut>
								<LayoutDashboard />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='hover:cursor-pointer'
							onClick={() => router.push('/profile')}
						>
							Profile
							<DropdownMenuShortcut>
								<UserPen />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:cursor-pointer'>
							Manage Users
							<DropdownMenuShortcut>
								<CalendarDays />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:cursor-pointer'>
							Manage Events
							<DropdownMenuShortcut>
								<CalendarDays />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:cursor-pointer'>
							Manage Categories
							<DropdownMenuShortcut>
								<ChartBarStacked />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:cursor-pointer'>
							Transactions
							<DropdownMenuShortcut>
								<Scroll />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='hover:cursor-pointer'
						onClick={handleLogout}
					>
						Log out
						<DropdownMenuShortcut>
							<LogOut />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default AdminMenu;
