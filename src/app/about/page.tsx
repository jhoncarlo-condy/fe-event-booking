import React from 'react';
import About from './about';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

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
