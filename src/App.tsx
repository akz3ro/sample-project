import { Route, Routes } from "react-router-dom";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "./components/ui/sidebar";
import Login from "./features/auth/components/Login";
import ProtectedRoute from "./features/auth/components/ProtectedRoutes";
import Booking from "./features/booking/components/Booking";
import Home from "./features/home/components/Home";
import { AppSidebar } from "./features/sidebar/components/AppSidebar";

const AppRoutes = () => (
	<Routes>
		<Route element={<ProtectedRoute />}>
			<Route path="/booking" element={<Booking />} />
			<Route path="/agent" element={<Home title="Agent" />} />
			<Route path="/supplier" element={<Home title="Supplier" />} />
			<Route path="/settings" element={<Home title="Settings" />} />
			<Route path="/help" element={<Home title="Help" />} />
		</Route>
		<Route path="/" element={<Home title="Home" />} />
		<Route path="/login" element={<Login />} />
	</Routes>
);

function App() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger className="md:hidden" />
			<SidebarInset className="px-4 md:mt-7 mt-10 overflow-x-hidden -ml-7 md:ml-0">
				<AppRoutes />
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
