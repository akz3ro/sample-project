import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/authApi";
import { type LoginSchemaType, loginSchema } from "../schema/auth.schema";

const Login = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) => {
	const [userData, setUserData] = useState<LoginSchemaType>({
		email: "admin@akzero.com",
		password: "admin",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const isDisabled =
		isLoading ||
		errors.email ||
		errors.password ||
		!userData.email ||
		!userData.password;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const isValidData = loginSchema.safeParse(userData);
		const { name } = e.target;
		if (!isValidData.success) {
			setErrors({
				...errors,
				[name]: isValidData.error.errors.filter((err) =>
					err.path.includes(name),
				)[0].message,
			});
		}
		setErrors({});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isValidData = loginSchema.safeParse(userData);
		if (!isValidData.success) {
			toast.error(
				isValidData.error.errors.reduce(
					(acc, curr) => `${acc} ${curr.message}`,
					"",
				),
			);
			return;
		}

		try {
			const result = await login(isValidData.data).unwrap();
			if (result.token) {
				setErrors({});
				setUserData({
					email: "admin@akzero.com",
					password: "admin",
				});
				toast.success("Login successful");
				navigate("/booking");
			}
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast.error(error.data?.message || "Login failed");
		}
	};

	return (
		<div className={cn("center flex-col gap-6 h-full", className)} {...props}>
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} aria-label="Login form">
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									value={userData.email}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="admin@akzero.com"
									required
									disabled={isLoading}
								/>
								{errors?.email && (
									<p className="text-destructive text-sm">{errors.email}</p>
								)}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									name="password"
									required
									value={userData.password}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="admin"
									disabled={isLoading}
								/>
								{errors?.password && (
									<p className="text-destructive text-sm">{errors.password}</p>
								)}
							</div>
							<Button
								type="submit"
								className="w-full text-foreground"
								disabled={Boolean(isDisabled)}
							>
								{isLoading ? (
									<span className="animate-pulse">Logging in...</span>
								) : (
									"Login"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
