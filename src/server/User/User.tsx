import { AxiosInstance } from "@/utils/axios";

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
			return error;
		});
};
