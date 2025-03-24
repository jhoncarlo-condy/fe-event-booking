import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const about = () => {
	return (
		<>
			<Header />
			<main className='flex-grow flex justify-center items-center text-center bg-gray-100 py-12'>
				<div className='max-w-3xl px-6'>
					<h2 className='text-4xl font-bold text-gray-800'>
						About Our Event Booking System
					</h2>

					<div className='mt-8'>
						<Card className='bg-white shadow-md p-6'>
							<CardContent className='text-gray-700 text-lg space-y-4'>
								<p>
									Welcome to our <strong>Simple Event Booking System</strong>—a
									streamlined solution designed to demonstrate how easy and
									efficient event management can be.
								</p>
								<h3 className='text-2xl font-semibold text-gray-800'>
									What is This Project?
								</h3>
								<p>
									This is a <strong>demo project</strong> built to showcase the
									core functionalities of an event booking system, including:
								</p>
								<ul className='list-disc list-inside text-left'>
									<li>
										<strong>Event Listings</strong> – View upcoming events with
										essential details.
									</li>
									<li>
										<strong>Booking System</strong> – Users can quickly reserve
										their spot for an event.
									</li>
									<li>
										<strong>Interactive Carousel</strong> – Smooth navigation
										through events using a modern UI.
									</li>
									<li>
										<strong>Responsive Design</strong> – Works seamlessly on all
										devices.
									</li>
								</ul>
								<h3 className='text-2xl font-semibold text-gray-800'>
									Why This Project?
								</h3>
								<p>
									The goal of this project is to provide a{' '}
									<strong>basic yet functional</strong> example of how event
									management can be implemented using modern web technologies.
									Whether you&apos;re a developer learning or just exploring,
									this project is an excellent starting point.
								</p>
								<h3 className='text-2xl font-semibold text-gray-800'>
									Disclaimer
								</h3>
								<p>
									This is <strong>only a sample project</strong> and is not
									intended for real-world event management. No actual bookings
									or transactions take place, and all event data is purely for
									demonstration purposes.
								</p>
								<p className='text-gray-600 italic'>
									Thank you for checking out this project! 🚀
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default about;
