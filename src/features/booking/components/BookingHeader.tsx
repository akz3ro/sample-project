import { Button } from "@/components/ui/button";
import { BookingIcon } from "@/features/sidebar/constants/groups";
import { Plus } from "lucide-react";

const BookingHeader = () => {
	return (
		<div className="center-y justify-between">
			<div className="center-y gap-3">
				<div className="bg-sidebar text-foreground hover:bg-sidebar/80 w-[46px] h-[46px] p-2 rounded-md center">
					<BookingIcon />
				</div>
				<span className="text-lg font-medium">Booking</span>
			</div>

			<Button className="!text-foreground" aria-label="Add Booking">
				<Plus className="!w-5 !h-5" />
			</Button>
		</div>
	);
};

export default BookingHeader;
