import Papa from "papaparse";
import type { BookingType } from "../types/data.type";

type BookingResponse = {
	success: boolean;
	data: BookingType[];
	total: number;
};

type CSVRow = {
	avatar: string;
	status: "confirmed" | "cancelled" | "vouchered" | "traveled";
	agent_name: string;
	agent_role: string;
	source?: "api" | "not_api" | undefined;
	id: string;
	booking_date: string;
	traveled_date: string;
	lead_px_name: string;
	lead_px_details: string;
	product_type: "boat" | "car";
	product_city: string;
	name_of_tour_main: string;
	name_of_tour_supp: string;
	booking_category: string;
	supplier: string;
	cancellation_deadline: string;
	cancellation_date: string;
	cancellation_id: string;
	refund_id: string;
};

export const SKIP_LIMIT = 12;

export const bookingData = async (skip: number): Promise<BookingResponse> => {
	const response = await fetch("/data/data.csv");
	const csvText = await response.text();

	const { data } = Papa.parse(csvText, {
		header: true,
		skipEmptyLines: true,
	});

	const rows: BookingType[] = (data as CSVRow[]).map((row) => ({
		avatar: row.avatar,
		status: row.status,
		agent: {
			name: row.agent_name,
			role: row.agent_role,
		},
		source: row.source ? row.source : undefined,
		id: row.id,
		date: {
			booking: row.booking_date,
			travel: row.traveled_date,
		},
		leadPaxName: {
			name: row.lead_px_name,
			details: row.lead_px_details,
		},
		product: {
			type: row.product_type,
			city: row.product_city,
		},
		nameOfTour: {
			main: row.name_of_tour_main,
			supp: row.name_of_tour_supp,
		},
		category: row.booking_category,
		supplier: row.supplier,
		cancellation: {
			deadline: row.cancellation_deadline,
			date: row.cancellation_date,
			id: row.cancellation_id,
		},
		refundId: row.refund_id,
	}));

	return {
		success: true,
		data: rows.slice(skip, skip + SKIP_LIMIT),
		total: rows.length,
	};
};
