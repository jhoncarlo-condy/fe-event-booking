export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	role: string;
	created_at: Date;
}

export interface Event {
	id: number;
	title: string;
	description: string;
	event_date: Date;
	start_time: string;
	end_time: string;
	capacity: number;
	price: number;
	location: string;
	image: string | null;
	status: string;
}

export interface Category {
	id: number;
	name: string;
}