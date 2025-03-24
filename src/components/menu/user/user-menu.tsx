import { FileClock, LogOut, UserCog, UserPen } from 'lucide-react';
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

const UserMenu = () => {
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
						<DropdownMenuItem className='hover:cursor-pointer'>
							Profile
							<DropdownMenuShortcut>
								<UserPen />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:cursor-pointer'>
							Booking History
							<DropdownMenuShortcut>
								<FileClock />
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

export default UserMenu;
