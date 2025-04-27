import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SKIP_LIMIT } from "../constants/data";
import { getBooking, setPage } from "../redux/bookingSlice";

const BookingPagination = () => {
	const { page, total } = useAppSelector(getBooking);
	const dispatch = useAppDispatch();
	const isActive = (index: number) => page === index + 1;
	const totalPages = Math.ceil(total / SKIP_LIMIT);

	const handleNext = () => {
		dispatch(setPage(page + 1));
	};

	const handlePrev = () => {
		if (page > 1) {
			dispatch(setPage(page - 1));
		}
	};

	return (
		<Pagination>
			<PaginationContent className="!gap-0">
				<PaginationItem className="h-full center-y">
					<Button
						variant="ghost"
						size="sm"
						onClick={handlePrev}
						disabled={page === 1}
						className={cn(
							"ml-2 w-5 h-5",
							page === 1 &&
								"opacity-20 cursor-not-allowed text-muted-foreground",
						)}
						aria-label="Previous Page"
					>
						<ChevronLeft className="!w-5 !h-5" />
					</Button>
				</PaginationItem>

				{Array.from({ length: 3 }, (_, index: number) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<PaginationItem key={index}>
						<Button
							variant={isActive(index) ? "default" : "ghost"}
							onClick={() => dispatch(setPage(index + 1))}
							size="sm"
							className={cn(
								"w-[23px] h-6",
								isActive(index) && "text-foreground",
							)}
							aria-label={`Go to Page ${index + 1}`}
						>
							{index + 1}
						</Button>
					</PaginationItem>
				))}

				<PaginationItem className="h-full center-y">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleNext}
						disabled={page === totalPages}
						className={cn(
							"mr-2 w-5 h-5",
							page === totalPages &&
								"opacity-20 cursor-not-allowed text-muted-foreground",
						)}
						aria-label="Next Page"
					>
						<ChevronRight className="!w-5 !h-5" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default BookingPagination;
