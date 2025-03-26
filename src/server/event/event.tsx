import { AxiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const getEvents = async () => {
	return await AxiosInstance.get('/events')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};

export const useGetEvents = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['getEvents'],
		queryFn: getEvents,
		staleTime: Infinity,
	});

	return { data: data, error, isLoading };
};

export const createEvent = async ({
	title,
	description,
	eventDate,
	startTime,
	endTime,
	capacity,
	price,
	location,
	category,
}: {
	title: string;
	description: string;
	eventDate: string;
	startTime: string;
	endTime: string;
	capacity: string;
	price: string;
	location: string;
	category: string,
}) => {
	return await AxiosInstance.post('/events', {
		title: title,
		description: description,
		event_date: eventDate,
		start_time: startTime,
		end_time: endTime,
		capacity: capacity,
		price: price,
		location: location,
		category: category
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.response?.data;
		});
};
