import { useAppSelector } from "@/hooks/use-redux";
import { getBooking } from "../redux/bookingSlice";
import BookingHeader from "./BookingHeader";
import BookingPagination from "./BookingPagination";
import BookingTable from "./BookingTable";
import BookingTableHeader from "./BookingTableHeader";

const Booking = () => {
	const { total } = useAppSelector(getBooking);
	return (
		<main className="flex flex-col w-full gap-4 h-full">
			<BookingHeader />
			<div className="flex-1 bg-sidebar rounded-t-lg flex flex-col gap-4 p-4">
				<div>
					<BookingTableHeader />
				</div>
				<div className="flex-1 border-2 border-border flex flex-col gap-4 rounded-lg">
					<div className="flex-1 overflow-x-auto">
						<BookingTable />
					</div>
					<div className="center-y justify-between px-4 pb-3">
						<div className="flex-1">
							<p className="text-sm">
								<span className="text-foreground pr-1">15</span>
								<span className="text-muted-foreground">
									out of {total} results
								</span>
							</p>
						</div>
						<div>
							<BookingPagination />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Booking;
