'use client';
import React, { useEffect, useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import SignIn from '../signin/SignIn';
import Cookies from 'js-cookie';
import UserMenu from '../menu/user/user-menu';
import AdminMenu from '../menu/admin/admin-menu';

const Header = () => {
	const [hasToken, setHasToken] = useState(false);
	const [role, setRole] = useState<string | null>('');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		setHasToken(!!Cookies.get('token'));
		const userRole = Cookies.get('role');
		setRole(userRole || null);
	}, []);

	if (!isMounted) return null; // Prevents hydration mismatch

	return (
		<>
			<header className='bg-[#3674B5] p-4'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<h1 className='text-white text-xl font-bold hover:cursor-pointer' onClick={() => window.location.replace('/')}>ABC Event Bookings</h1>
					<NavigationMenu>
						<NavigationMenuList className='flex space-x-6'>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/'
									className='text-white hover:text-black'
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							{hasToken && (
								<NavigationMenuItem>
									<NavigationMenuLink
										href='/events'
										className='text-white hover:text-black'
									>
										Events
									</NavigationMenuLink>
								</NavigationMenuItem>
							)}
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/about'
									className='text-white hover:text-black'
								>
									About
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								{hasToken && role && role === 'admin' && <AdminMenu />}
								{hasToken && role && role === 'user' && <UserMenu />}
								{!hasToken && (
									<Dialog>
										<DialogTrigger className='bg-gray-100 text-black hover:bg-gray-300 px-4 py-2 rounded hover:cursor-pointer'>
											Book Now
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle></DialogTitle>
											</DialogHeader>
											<SignIn />
										</DialogContent>
									</Dialog>
								)}
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</header>
		</>
	);
};

export default Header;
