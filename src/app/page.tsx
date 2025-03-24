'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';


const LandingPage = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			{/* Main Content */}
			<main className='flex-grow flex justify-center items-center text-center bg-gray-100 py-12'>
				<div className='max-w-6xl px-6 w-full'>
					<h2 className='text-4xl font-bold text-gray-800'>Upcoming Events</h2>

					{/* Shadcn Carousel */}
					<div className='mt-8 relative w-full'>
						<Carousel
							plugins={[
								Autoplay({
									delay: 3000,
								}),
							]}
							className='w-full max-w-full'
						>
							<CarouselContent className='flex'>
								{Array.from({ length: 5 }).map((_, index) => (
									<CarouselItem
										key={index}
										className='min-w-[33.33%] md:min-w-[33.33%] lg:min-w-[33.33%] h-full basis-1/3'
									>
										<div className='p-2 h-full'>
											<Card className='h-[500px] flex flex-col justify-between'>
												<CardContent className='flex flex-col items-center justify-center p-6 flex-grow'>
													<span className='text-4xl font-semibold'>
														{index + 1}
													</span>
												</CardContent>
												<div className='p-4 flex justify-center'>
													<Button
														className='w-2/5 bg-[#578FCA] text-white hover:bg-blue-400 hover:text-white border-2 hover:cursor-pointer'
														variant='outline'
													>
														Book Now
													</Button>
												</div>
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
			<Footer />
		</div>
	);
};

export default LandingPage;
