import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { type LoginSchemaType, loginSchema } from "../schema/auth.schema";

interface JwtPayload {
	role: string;
	exp?: number;
	iat?: number;
}

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		login: builder.mutation<{ token: string }, LoginSchemaType>({
			queryFn: async ({ email, password }) => {
				const realEmail = import.meta.env.VITE_USER_EMAIL;
				const realPassword = import.meta.env.VITE_USER_PASSWORD;

				const isValidData = loginSchema.safeParse({ email, password });
				if (!isValidData.success) {
					return {
						error: {
							status: 400,
							data: { message: "Invalid Email or Password" },
						},
					};
				}

				if (email === realEmail && password === realPassword) {
					const mockToken = import.meta.env.VITE_JWT_SECRET;
					Cookies.set("token", mockToken, { expires: 1 });
					return { data: { token: mockToken } };
				}
				return {
					error: {
						status: 401,
						data: {
							message: "Please Enter Email:admin@akzero.com and Password:admin",
						},
					},
				};
			},
		}),

		refreshToken: builder.mutation<{ token: string }, void>({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			queryFn: async (_arg, _api): Promise<any> => {
				const refreshToken = Cookies.get("token");
				if (!refreshToken) {
					return { error: { status: 401, data: { message: "Unauthorized" } } };
				}

				try {
					const decoded = jwtDecode<JwtPayload>(refreshToken);
					if (decoded) {
						const mockToken = import.meta.env.VITE_JWT_SECRET;
						Cookies.set("token", mockToken, { expires: 1 });
						return { data: { token: mockToken } };
					}
				} catch (error) {
					return { error: { status: 401, data: { message: "Unauthorized" } } };
				}
			},
		}),

		logout: builder.mutation<void, void>({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			queryFn: async (_arg, _api): Promise<any> => {
				Cookies.remove("token");
				return { data: {} };
			},
		}),
	}),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
	authApi;
export default authApi;
