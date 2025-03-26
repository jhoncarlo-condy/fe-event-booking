import { AxiosInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const getEvents = async () => {
	return await AxiosInstance.get('/events')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
}

export const useGetEvents = () => {
	const {data, error, isLoading} = useQuery({
		queryKey: ["getEvents"],
		queryFn: getEvents,
		staleTime: Infinity
	});

	return { data: data , error, isLoading };
}