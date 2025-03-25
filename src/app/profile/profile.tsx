import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Button } from '@/components/ui/button';


const Profile = () => {
	return (
		<div className='flex-grow border p-4'>
			<Card className='shadow-md p-6'>
				<Card className='m-10'>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<FloatingLabelInput label='Store Name' />
						</form>
					</CardContent>
					<CardFooter className='border-t px-6 py-4'>
						<Button>Save</Button>
					</CardFooter>
				</Card>

				<Card className='m-10'>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<FloatingLabelInput label='Store Name' />
						</form>
					</CardContent>
					<CardFooter className='border-t px-6 py-4'>
						<Button>Save</Button>
					</CardFooter>
				</Card>
			</Card>
		</div>
	);
};

export default Profile;
