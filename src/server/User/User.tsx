import { AxiosInstance } from '@/utils/axios';

export const loginUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	return await AxiosInstance.post('/login', {
		email: email,
		password: password,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const logoutUser = async () => {
	return await AxiosInstance.post('/logout')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const registerUser = async ({
	firstName,
	lastName,
	email,
	password,
	passwordConfirmation
}: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}) => {
	return await AxiosInstance.post('/register', {
		first_name: firstName,
		last_name: lastName,
		email: email,
		password: password,
		password_confirmation: passwordConfirmation
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
}
