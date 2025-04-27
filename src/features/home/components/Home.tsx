const Home = ({ title }: { title: string }) => {
	return (
		<main className="center flex-col gap-4 h-full ">
			<h1 className="text-2xl font-bold">Sample Project</h1>
			<h2 className="text-lg font-medium">{title} Page</h2>
		</main>
	);
};

export default Home;
