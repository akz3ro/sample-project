import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "../styles/styles.module.css";

const Menu = ({ name }: { name: string }) => {
	const isFilter = name === "filters";
	const [isOpen, setIsOpen] = useState(false);
	const [isAll, setIsAll] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]); // لحفظ العناصر المحددة

	const items = [
		{ id: "1", name: "B2B bookings" },
		{ id: "2", name: "B2B bookings" },
		{ id: "3", name: "activity" },
		{ id: "4", name: "transfers" },
		{ id: "5", name: "settings" },
		{ id: "6", name: "activity" },
		{ id: "7", name: "B2B bookings" },
		{ id: "8", name: "transfers" },
		{ id: "9", name: "settings" },
		{ id: "10", name: "B2B bookings" },
		{ id: "11", name: "activity" },
	];

	const handleCheckboxChange = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const handleSelectAll = () => {
		if (isAll) {
			setSelectedItems([]);
		} else {
			setSelectedItems(items.map((item) => item.id));
		}
	};

	useEffect(() => {
		setIsAll(items.every((item) => selectedItems.includes(item.id)));
	}, [selectedItems]);

	return (
		<Popover onOpenChange={setIsOpen} open={isOpen}>
			<PopoverTrigger
				className={cn(
					"capitalize border-2 py-2.5 px-3 rounded-lg flex items-center justify-between  text-sm whitespace-nowrap",
					isFilter
						? "w-[106px] flex-row-reverse gap-2"
						: "w-[154px] text-muted-foreground",
				)}
			>
				{name}
				{isFilter ? (
					<SlidersHorizontal className="!w-4 !h-4" />
				) : (
					<ChevronDown className="!w-5 !h-5" />
				)}
			</PopoverTrigger>
			<PopoverContent className="bg-sidebar px-0 pb-0 w-fit">
				<div className="border-b-2 border-gray-400 mb-3 pb-3">
					<div className="flex items-center gap-2 px-3">
						<Checkbox
							id="all"
							className="!bg-sidebar border-2 border-gray-400 w-5 h-5 rounded-sm !ring-gray-400 !ring-offset-0 !text-gray-400"
							checked={isAll}
							onCheckedChange={handleSelectAll}
						/>
						<Label htmlFor="all" className="text-gray-400">
							Select All
						</Label>
					</div>
				</div>

				<ul
					className={cn(
						"flex flex-col gap-5 px-3 max-h-[210px] overflow-y-auto",
						styles["filter-scroll"],
					)}
				>
					{items.map((item) => (
						<li
							key={item.id}
							className="flex items-center gap-2 hover:bg-sidebar-accent rounded-md p-1 transition-all duration-300 cursor-pointer"
						>
							<Checkbox
								id={item.id}
								className="!bg-sidebar border-2 border-gray-400 w-5 h-5 rounded-sm !ring-gray-400 !ring-offset-0 !text-gray-400 cursor-pointer"
								checked={selectedItems.includes(item.id)}
								onCheckedChange={() => handleCheckboxChange(item.id)}
							/>
							<Label
								htmlFor={item.id}
								className="text-gray-400 capitalize cursor-pointer"
							>
								{item.name}
							</Label>
						</li>
					))}
				</ul>

				<div className="flex items-center justify-end py-2 border-t-2 border-gray-400">
					<div className="px-3">
						<Button
							className="text-foreground"
							onClick={() => setIsOpen(false)}
							aria-label="Apply Filters"
						>
							Apply
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

const BookingTableHeader = () => {
	const items = [
		"agent",
		"supplier",
		"booking ID",
		"lead pax name",
		"booking status",
	];

	return (
		<div className="flex items-center gap-4 flex-wrap justify-center md:justify-start md:flex-nowrap">
			{items.map((ele) => (
				<Menu key={ele} name={ele === "booking status" ? ele : `${ele}...`} />
			))}

			<Button className="text-foreground w-[138px]" aria-label="Apply">
				Apply
			</Button>
			<Menu name="filters" />
		</div>
	);
};

export default BookingTableHeader;
