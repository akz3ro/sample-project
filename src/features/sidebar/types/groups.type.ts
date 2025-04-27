import type { LucideIcon } from "lucide-react";

export type SidebarGroupType = {
	label: string;
	icon: LucideIcon;
	href?: string;
	childs?: SidebarGroupType[];
};
