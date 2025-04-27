import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useTokenRefresh } from "../hooks/useTokenRefresh";

const ProtectedRoutes = () => {
	useTokenRefresh();
	const token = Cookies.get("token");

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
