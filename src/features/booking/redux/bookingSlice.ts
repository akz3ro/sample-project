import type { RootState } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SKIP_LIMIT, bookingData } from "../constants/data";
import type { BookingType } from "../types/data.type";
type BookingState = {
	data: BookingType[];
	page: number;
	total: number;
	loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: BookingState = {
	data: [],
	page: 1,
	total: 0,
	loading: "idle",
};

export const fetchBookings = createAsyncThunk(
	"booking/fetchBookings",
	async (page: number) => {
		const skip = (page - 1) * SKIP_LIMIT;
		await new Promise((resolve) => setTimeout(resolve, 500));
		const response = await bookingData(skip);
		return response;
	},
);

export const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBookings.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(fetchBookings.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.total = action.payload.total;
			state.loading = "succeeded";
		});
		builder.addCase(fetchBookings.rejected, (state) => {
			state.loading = "failed";
		});
	},
});

export const getBooking = (state: RootState) => state.booking;

export const { setPage } = bookingSlice.actions;

export default bookingSlice.reducer;
