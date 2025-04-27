import { ChevronRight } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SidebarGroupType } from "../types/groups.type";

// Types
type Props = {
	group: SidebarGroupType;
	isExpanded: boolean;
};

type ContentProps = {
	childs?: SidebarGroupType[];
	isExpanded: boolean;
};

type ExpandedMenuProps = Props & {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// Helper Functions
const isActive = (href: string) => {
	const { pathname } = useLocation();
	return href === pathname;
};

// Components
const Content = ({ childs, isExpanded }: ContentProps) => {
	return (
		<SidebarMenu
			className={cn(
				isExpanded &&
					"grid grid-rows-[0fr] group-data-[state=open]/collapsible:grid-rows-[1fr] transition-all duration-300",
			)}
		>
			<ul className="overflow-hidden space-y-3">
				{childs?.map((child: SidebarGroupType) => (
					<SidebarMenuItem key={child.label}>
						<SidebarMenuButton asChild>
							<Link
								aria-label={child.label}
								to={child.href ?? ""}
								className={cn(
									"flex items-center gap-2 p-2 rounded-md transition-colors duration-200 whitespace-nowrap",
									isActive(child.href ?? "")
										? "!bg-primary text-foreground"
										: "hover:bg-sidebar-accent text-muted-foreground",
								)}
							>
								<child.icon className="!w-5 !h-5" />
								<span className="text-sm font-medium">{child.label}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</ul>
		</SidebarMenu>
	);
};

const CollapsedMenu = ({ group, isExpanded }: Props) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<SidebarMenuButton className="center">
					<group.icon className="!w-5 !h-5" />
				</SidebarMenuButton>
			</TooltipTrigger>
			<TooltipContent
				className="bg-sidebar text-foreground ml-12 p-2"
				iconClassName="bg-sidebar fill-sidebar"
				sideOffset={-100}
			>
				<Content childs={group.childs} isExpanded={isExpanded} />
			</TooltipContent>
		</Tooltip>
	);
};

const ExpandedMenu = ({ group, isExpanded, setIsOpen }: ExpandedMenuProps) => {
	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<SidebarGroupLabel
				className={cn(
					"!text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-3 whitespace-nowrap",
					!isExpanded && "center",
				)}
				onClick={handleClick}
			>
				<p className="center-y gap-2 text-muted-foreground">
					<group.icon className="!w-5 !h-5" />
					<span className={cn(isExpanded ? "text-base font-medium" : "hidden")}>
						{group.label}
					</span>
				</p>

				{isExpanded && (
					<ChevronRight className="text-muted-foreground ml-auto !w-5 !h-5 transition-transform group-data-[state=open]/collapsible:rotate-90" />
				)}
			</SidebarGroupLabel>
			<Content childs={group.childs} isExpanded={isExpanded} />
		</>
	);
};

const Menu = ({ group, isExpanded }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<SidebarGroup
			data-state={isOpen ? "open" : "closed"}
			className="group/collapsible select-none py-0 my-0"
		>
			{isExpanded ? (
				<ExpandedMenu
					group={group}
					isExpanded={isExpanded}
					setIsOpen={setIsOpen}
				/>
			) : (
				<CollapsedMenu group={group} isExpanded={isExpanded} />
			)}
		</SidebarGroup>
	);
};

export default Menu;
