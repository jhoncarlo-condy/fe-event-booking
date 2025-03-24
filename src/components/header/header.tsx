import React from 'react';
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

const header = () => {
	return (
		<>
			<header className='bg-[#3674B5] p-4'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<h1 className='text-white text-xl font-bold'>ABC Event Bookings</h1>
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
							<NavigationMenuItem>
								<NavigationMenuLink
									href='/about'
									className='text-white hover:text-black'
								>
									About
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Dialog>
									<DialogTrigger className='bg-gray-100 text-black hover:bg-gray-300 px-4 py-2 rounded'>
										Book Now
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle></DialogTitle>
										</DialogHeader>
										<SignIn />
									</DialogContent>
								</Dialog>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</header>
		</>
	);
};

export default header;
