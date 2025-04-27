import { SidebarFooter, SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

type Props = {
	isExpanded: boolean;
};

const Footer = ({ isExpanded }: Props) => {
	return (
		<SidebarFooter>
			<hr className="bg-foreground" />
			<SidebarMenuButton
				className={cn(
					"w-full  text-muted-foreground mt-3",
					isExpanded && "justify-between",
				)}
				aria-label="Logout"
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
