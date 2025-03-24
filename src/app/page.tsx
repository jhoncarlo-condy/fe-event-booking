'use client';
import React, { useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true })
	);

	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			{/* Navbar */}
			<header className='bg-blue-600 p-4'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<h1 className='text-white text-xl font-bold'>ABC Event Bookings</h1>
					<NavigationMenu>
						<NavigationMenuList className='flex space-x-6'>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='#home'
									className='text-white hover:text-black'
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='#about'
									className='text-white hover:text-black'
								>
									About
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									href='#login'
									className='text-white hover:text-black'
								>
									Login
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</header>

			{/* Main Content */}
			<main className='flex-grow flex justify-center items-center text-center bg-gray-100 py-12'>
				<div className='max-w-3xl px-6'>
					<h2 className='text-4xl font-bold text-gray-800'>Upcoming Events</h2>

					{/* Shadcn Carousel */}
					<div className='mt-8 relative'>
						<Carousel
							plugins={[plugin.current]}
							className='w-max'
							onMouseEnter={plugin.current.stop}
							onMouseLeave={plugin.current.reset}
						>
							<CarouselContent >
								{Array.from({ length: 5 }).map((_, index) => (
									<CarouselItem key={index} className="basis-1/3">
										<div className='p-1'>
											<Card>
												<CardContent className='flex aspect-square items-center justify-center p-6'>
													<span className='text-4xl font-semibold'>
														{index + 1}
													</span>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className='bg-gray-800 text-white text-center py-4'>
				<p>&copy; 2025 My Landing Page. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
