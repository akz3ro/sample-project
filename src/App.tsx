import { Route, Routes } from "react-router-dom";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "./components/ui/sidebar";
import Booking from "./features/booking/components/Booking";
import Home from "./features/home/components/Home";
import { AppSidebar } from "./features/sidebar/components/AppSidebar";

function App() {
	const AppRoutes = () => (
		<Routes>
			<Route path="/" element={<Home title="Home" />} />
			<Route path="/booking" element={<Booking />} />
			<Route path="/agent" element={<Home title="Agent" />} />
			<Route path="/supplier" element={<Home title="Supplier" />} />
			<Route path="/settings" element={<Home title="Settings" />} />
			<Route path="/help" element={<Home title="Help" />} />
		</Routes>
	);
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger className="md:hidden" />
			<SidebarInset className="px-4 mt-7 overflow-x-hidden hidden md:block">
				<AppRoutes />
			</SidebarInset>
			<div className="md:hidden mt-10 -mx-5 w-full pr-5 pl-1">
				<AppRoutes />
			</div>
		</SidebarProvider>
	);
}

export default App;
