import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import type { SidebarGroupType } from "../types/groups.type";

type Props = {
	support: SidebarGroupType[];
	isExpanded: boolean;
};

const SidebarItems = ({ support, isExpanded }: Props) => {
	const { pathname } = useLocation();

	return (
		<SidebarGroup className="py-0 my-0">
			<SidebarGroupContent>
				<SidebarMenu className="gap-3">
					{support.map((group) => (
						<SidebarMenuItem key={group.label}>
							<SidebarMenuButton asChild>
								<Link
									aria-label={group.label}
									to={group.href ?? "/"}
									className={cn(
										!isExpanded && "center",
										pathname === group.href
											? "!bg-primary text-foreground transition-colors duration-200"
											: "text-muted-foreground",
									)}
								>
									<group.icon className="!w-5 !h-5" />
									<span
										className={cn(
											"text-base font-medium",
											!isExpanded && "hidden",
										)}
									>
										{group.label}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};

export default SidebarItems;
