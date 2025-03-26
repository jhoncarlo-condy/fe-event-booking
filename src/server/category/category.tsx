import { AxiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const getCategories = async () => {
	return await AxiosInstance.get('/categories')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const useGetCategories = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['getCategories'],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	return { data: data, error, isLoading };
};

export const createCategory = async ({ name }: { name: string }) => {
	return await AxiosInstance.post('/categories', {
		name: name,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const getCategoryDetail = async ({ id }: { id: number }) => {
	return await AxiosInstance.get(`/categories/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const updateCategory = async ({
	id,
	name,
}: {
	id: number;
	name: string;
}) => {
	return await AxiosInstance.put(`/categories/${id}}`, {
		name: name,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const deleteCategory = async ({ id }: { id: number }) => {
	return await AxiosInstance.delete(`/categories/${id}}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};
