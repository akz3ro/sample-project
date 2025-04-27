import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Loading from "@/features/loading/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { cn } from "@/lib/utils";
import { ChevronDown, Eye } from "lucide-react";
import { useEffect } from "react";
import { fetchBookings, getBooking } from "../redux/bookingSlice";
import styles from "../styles/styles.module.css";

const BookingTable = () => {
	const { data, loading, page } = useAppSelector(getBooking);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBookings(page));
	}, [dispatch, page]);

	if (loading === "pending") {
		return (
			<div className="h-full center">
				<Loading />
			</div>
		);
	}

	if (loading === "failed") {
		return (
			<div className="text-destructive text-2xl font-bold h-full center">
				No data found
			</div>
		);
	}

	const colStyle = "capitalize  text-sm";
	const wrapStyle = "whitespace-normal break-words";

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-background">
					<TableHead
						className={cn(
							colStyle,
							"min-w-[72px] text-center break-words whitespace-normal",
						)}
					>
						booking status
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[200px]")}>agent</TableHead>
					<TableHead
						className={cn(
							colStyle,
							"min-w-[72px] break-words whitespace-normal",
						)}
					>
						booking source
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[88px]")}>
						booking ID
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[101px]")}>
						booking date
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[96px]")}>
						travel date
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[133px]")}>
						lead pax name
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[101px]")}>
						product type
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[123px]")}>
						booking status
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[96px]")}>
						product city
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[348px]")}>
						Name of Tour
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[128px]")}>
						booking category
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[200px]")}>
						supplier
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[96px]", wrapStyle)}>
						cancellation deadline
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[96px]", wrapStyle)}>
						cancellation date
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[111px]")}>
						cancellation id
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[88px]")}>
						refund id
					</TableHead>
					<TableHead className={cn(colStyle, "min-w-[64px]", wrapStyle)}>
						Driver Details
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className={styles["booking-table"]}>
				{data.map((ele, index) => (
					<TableRow key={`${ele.id}-${index}`}>
						<TableCell className={cn(colStyle)}>
							<div className="w-full h-full center">
								<div
									className={cn(
										"border-2 rounded-full w-[33px] h-[26px] center",
										ele.avatar === "m"
											? "bg-[#14356A] border-[#427EF6]"
											: "bg-[#4A146A] border-[#B442F6]",
									)}
								>
									{ele.avatar}
								</div>
							</div>
						</TableCell>
						<TableCell className="flex flex-col gap-1">
							<span>{ele.agent.name}</span>
							<span className="text-muted-foreground text-sm">
								{ele.agent.role}
							</span>
						</TableCell>
						<TableCell>
							<div className="w-full h-full center">
								{ele.source === "not_api" ? (
									<img
										src="/assets/not_api.svg"
										alt={ele.source ?? "N/A"}
										loading="lazy"
									/>
								) : ele.source === "api" ? (
									<img
										src="/assets/api.svg"
										alt={ele.source ?? "N/A"}
										loading="lazy"
									/>
								) : null}
							</div>
						</TableCell>
						<TableCell className="text-[#FF5594]">{ele.id}</TableCell>
						<TableCell className="text-muted-foreground">
							{ele.date.booking}
						</TableCell>
						<TableCell className="text-muted-foreground">
							{ele.date.travel}
						</TableCell>
						<TableCell className="flex flex-col gap-1">
							<span>{ele.leadPaxName.name}</span>
							<span className="text-muted-foreground text-sm">
								{ele.leadPaxName.details}
							</span>
						</TableCell>
						<TableCell>
							<div className="w-full h-full center">
								{ele.product.type === "boat" ? (
									<img
										src="/assets/boat.svg"
										alt={ele.product.type ?? "N/A"}
										loading="lazy"
									/>
								) : (
									<img
										src="/assets/car.svg"
										alt={ele.product.type ?? "N/A"}
										loading="lazy"
									/>
								)}
							</div>
						</TableCell>
						<TableCell>
							<div className="w-full h-full center">
								<div
									className={cn(
										"capitalize border-2 rounded-full px-2 py-1 text-sm  w-fit",
										ele.status === "confirmed"
											? "bg-[#0FAA40] border-[#57FF8C] flex justify-between gap-1 items-center"
											: ele.status === "cancelled"
												? "bg-[#A80606] border-[#FF4242]"
												: ele.status === "vouchered"
													? "bg-[#34BED9] border-[#B3F2FF] flex justify-between gap-1 items-center"
													: "bg-[#0B2958] border-[#2E79FA]",
									)}
								>
									{ele.status === "confirmed" || ele.status === "vouchered" ? (
										<>
											{ele.status}
											<ChevronDown className="w-4 h-4" />
										</>
									) : (
										ele.status
									)}
								</div>
							</div>
						</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.product.city}
						</TableCell>
						<TableCell className="capitalize">
							<div className="flex flex-col gap-1 text-muted-foreground">
								<span>{ele.nameOfTour.main}</span>
								<span>{ele.nameOfTour.supp}</span>
							</div>
						</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.category}
						</TableCell>
						<TableCell className="capitalize">{ele.supplier}</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.cancellation.deadline}
						</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.cancellation.date}
						</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.cancellation.id}
						</TableCell>
						<TableCell className="capitalize text-muted-foreground">
							{ele.refundId}
						</TableCell>
						<TableCell>
							<div className="w-full h-full center">
								<Eye className="text-[#FBACC9]" />
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BookingTable;
