import Header from '@/components/header/header';
import React from 'react'
import Events from './events';
import Footer from '@/components/footer/footer';

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<Events />
			<Footer />
		</div>
	);
}

export default page