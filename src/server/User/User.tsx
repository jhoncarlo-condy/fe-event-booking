import { AxiosInstance } from '@/utils/axios';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

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
	passwordConfirmation,
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
		password_confirmation: passwordConfirmation,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const updateUser = async ({
	firstName,
	lastName,
	email,
}: {
	firstName: string;
	lastName: string;
	email: string;
}) => {
	return await AxiosInstance.put(`/update/${email}`, {
		first_name: firstName,
		last_name: lastName,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const changePassword = async ({
	oldPassword,
	password,
	passwordConfirmation,
}: {
	oldPassword: string;
	password: string;
	passwordConfirmation: string;
}) => {
	return await AxiosInstance.post('/change-password', {
		old_password: oldPassword,
		password: password,
		password_confirmation: passwordConfirmation,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const getUser = async () => {
	return await AxiosInstance.get('/profile')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const useGetUser = () => {
	const {data, error, isLoading} = useQuery({
		queryKey: ["getUser"],
		queryFn: getUser,
		staleTime: Infinity
	});

	return { data: data , error, isLoading };
}

export const getUserDetail = async ({ email }: { email: string }) => {
	return await AxiosInstance.get(`/user/${email}`)
	  .then((response) => {
		return response.data;
	  })
	  .catch((error) => {
		return error.response?.data;
	  });
  };
  
export const getUsers = async () => {
	return await AxiosInstance.get('/users')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
}

export const useGetUsers = () => {
	const {data, error, isLoading} = useQuery({
		queryKey: ["getUsers"],
		queryFn: getUsers,
		staleTime: Infinity
	});

	return { data: data , error, isLoading };
}