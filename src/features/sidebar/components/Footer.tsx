import { SidebarFooter, SidebarMenuButton } from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/features/auth/redux/authApi";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
	isExpanded: boolean;
};

const Footer = ({ isExpanded }: Props) => {
	const navigate = useNavigate();
	const [logout] = useLogoutMutation();
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	return (
		<SidebarFooter>
			<hr className="bg-foreground" />
			<SidebarMenuButton
				className={cn(
					"w-full  text-muted-foreground mt-3",
					isExpanded && "justify-between",
				)}
				aria-label="Logout"
				onClick={handleLogout}
			>
				<span className={cn("text-base font-medium", !isExpanded && "hidden")}>
					Logout
				</span>
				<LogOut className="!w-5 !h-5 rotate-180" />
			</SidebarMenuButton>
		</SidebarFooter>
	);
};

export default Footer;
