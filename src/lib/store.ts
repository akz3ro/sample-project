import authApi from "@/features/auth/redux/authApi";
import authReducer from "@/features/auth/redux/authSlice";
import bookingReducer from "@/features/booking/redux/bookingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		booking: bookingReducer,
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
