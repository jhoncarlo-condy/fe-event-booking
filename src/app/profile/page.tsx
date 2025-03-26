import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Profile from './profile';

const page = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<Header />
			<Profile />
			<Footer />
		</div>
	);
};

export default page;
