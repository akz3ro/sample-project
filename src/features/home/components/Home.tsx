import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Home = ({ title }: { title: string }) => {
	const token = Cookies.get("token");
	return (
		<main className="center flex-col gap-4 h-full ">
			<h1 className="text-2xl font-bold">Sample Project</h1>
			<h2 className="text-lg font-medium">{title} Page</h2>
			<div className="flex justify-center items-center gap-5">
				<Button asChild className="text-foreground">
					<Link to="/booking">Go To Booking Page</Link>
				</Button>
				{!token && (
					<Button asChild className="text-foreground" variant="outline">
						<Link to="/login">Login</Link>
					</Button>
				)}
			</div>
		</main>
	);
};

export default Home;
