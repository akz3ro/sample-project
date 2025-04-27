export type BookingType = {
	avatar: string;
	status: "confirmed" | "cancelled" | "vouchered" | "traveled";
	agent: {
		name: string;
		role: string;
	};
	source?: "api" | "not_api" | undefined;
	id: string;
	date: {
		booking: string;
		travel: string;
	};
	leadPaxName: {
		name: string;
		details: string;
	};
	product: {
		type: "boat" | "car";
		city: string;
	};
	nameOfTour: {
		main: string;
		supp: string;
	};
	category: string;
	supplier: string;
	cancellation: {
		date: string;
		deadline: string;
		id: string;
	};
	refundId: string;
};
