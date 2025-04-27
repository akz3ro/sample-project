import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRefreshTokenMutation } from "../redux/authApi";

const REFRESH_THRESHOLD = 30 * 60 * 1000; // 30 minutes before expiration
const CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

export const useTokenRefresh = () => {
	const [refreshToken] = useRefreshTokenMutation();

	useEffect(() => {
		const checkAndRefreshToken = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			try {
				const decoded = jwtDecode(token);
				const currentTime = Date.now();
				const expirationTime = (decoded.exp || 0) * 1000;

				// If token is about to expire in the next 30 minutes
				if (expirationTime - currentTime < REFRESH_THRESHOLD) {
					await refreshToken();
				}
			} catch (error) {
				console.error("Error checking token expiration:", error);
			}
		};

		// Check token every 5 minutes
		const interval = setInterval(checkAndRefreshToken, CHECK_INTERVAL);

		// Initial check
		checkAndRefreshToken();

		return () => clearInterval(interval);
	}, [refreshToken]);
};
