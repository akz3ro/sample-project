import {
	Sidebar,
	SidebarContent,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { Products, Support, UserManagement } from "../constants/groups";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import SidebarItem from "./SidebarItems";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar();
	const isExpanded = state === "expanded";

	return (
		<Sidebar collapsible="icon" {...props}>
			<Header />

			<SidebarContent className="space-y-3">
				<Menu group={UserManagement} isExpanded={isExpanded} />
				<Menu group={Products} isExpanded={isExpanded} />

				<hr className="bg-foreground mx-2" />

				<SidebarItem support={Support} isExpanded={isExpanded} />
			</SidebarContent>
			<Footer isExpanded={isExpanded} />
			<SidebarRail />
		</Sidebar>
	);
}
