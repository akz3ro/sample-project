import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useTokenRefresh } from "../hooks/useTokenRefresh";
import { setToken } from "../redux/authSlice";

const ProtectedRoutes = () => {
	useTokenRefresh();
	const dispatch = useAppDispatch();
	const { token } = useAppSelector((state) => state.auth);

	let tokenFromCookies: string | undefined;
	if (!token) {
		tokenFromCookies = Cookies.get("token");
		if (!tokenFromCookies || isTokenExpired(tokenFromCookies)) {
			return <Navigate to="/login" replace />;
		}
		dispatch(setToken(tokenFromCookies));
	}

	if (!token || isTokenExpired(token)) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

const isTokenExpired = (token: string) => {
	try {
		const decoded = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		return decoded.exp && decoded.exp < currentTime;
	} catch (error) {
		return true;
	}
};

export default ProtectedRoutes;
