import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import About from './about';

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<About />
			<Footer />
		</div>
	);
};

export default page;
