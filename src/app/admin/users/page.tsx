import React from 'react';
import Users from './users';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<Users />
			<Footer />
		</div>
	);
};

export default page;
