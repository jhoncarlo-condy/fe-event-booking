import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Dashboard from './dashboard';

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<Dashboard />
			<Footer />
		</div>
	);
};

export default page;
