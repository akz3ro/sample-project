import {
	SidebarHeader,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";

const Header = () => {
	const { state } = useSidebar();
	const isExpanded = state === "expanded";
	return (
		<SidebarHeader
			className={cn(
				"flex pt-7 mb-[50px]",
				isExpanded
					? "justify-between items-center px-4 flex-row"
					: "flex-col-reverse gap-4 justify-center",
			)}
		>
			<div
				className={cn(
					"h-7 pointer-events-none",
					isExpanded && "flex items-center gap-0.5",
				)}
			>
				<img
					src="/assets/logo.svg"
					alt="Logo"
					className="w-10 h-6"
					loading="eager"
				/>
				<h2
					className={cn(
						isExpanded
							? "text-lg font-bold font-poppins -tracking-tight"
							: "hidden",
					)}
				>
					activitybeds
				</h2>
			</div>
			<SidebarTrigger>
				<ChevronsLeft
					className={cn(
						"!w-5 !h-5 transition-transform duration-300",
						!isExpanded && "transform rotate-180",
					)}
				/>
			</SidebarTrigger>
		</SidebarHeader>
	);
};

export default Header;
